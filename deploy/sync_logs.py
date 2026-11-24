#!/usr/bin/env python3
"""
Incremental Nginx -> SQLite log synchronizer & Central Monitoring manifest updater
for Mancia Studios (manciastudios.com - v3.2.0).
Writes structured logs to /LOGS-PROJETOS/manciastudios/logs.db
and refreshes /LOGS-PROJETOS/manciastudios/central-app.json.
"""
import datetime
import json
import os
import re
import sqlite3
from pathlib import Path

APP_VERSION = "v3.2.0"
DB_DIR = Path(os.environ.get("MANCIA_LOG_DIR", "/LOGS-PROJETOS/manciastudios"))
DB_DIR.mkdir(parents=True, exist_ok=True)
DB_PATH = DB_DIR / "logs.db"
STATE_PATH = DB_DIR / ".offset_state.json"
MANIFEST_PATH = DB_DIR / "central-app.json"

ACCESS_LOG = Path("/var/log/nginx/manciastudios_access.log")
ERROR_LOG = Path("/var/log/nginx/manciastudios_error.log")
NGINX_PID_PATHS = [Path("/run/nginx.pid"), Path("/var/run/nginx.pid")]

ACCESS_RE = re.compile(
    r'^(?P<ip>\S+)\s+\S+\s+\S+\s+\[(?P<ts>[^\]]+)\]\s+"(?P<req>[^"]*)"\s+(?P<status>\d{3})\s+(?P<bytes>\S+)\s+"(?P<ref>[^"]*)"\s+"(?P<ua>[^"]*)"'
)
ERROR_RE = re.compile(
    r'^(?P<ts>\d{4}/\d{2}/\d{2}\s+\d{2}:\d{2}:\d{2})\s+\[(?P<lvl>\w+)\]\s+(?P<msg>.*)$'
)


def parse_nginx_access_ts(raw_ts: str) -> str:
    try:
        dt = datetime.datetime.strptime(raw_ts, "%d/%b/%Y:%H:%M:%S %z")
        return dt.astimezone().strftime("%Y-%m-%d %H:%M:%S")
    except Exception:
        return datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")


def parse_nginx_error_ts(raw_ts: str) -> str:
    try:
        dt = datetime.datetime.strptime(raw_ts, "%Y/%m/%d %H:%M:%S")
        return dt.strftime("%Y-%m-%d %H:%M:%S")
    except Exception:
        return datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")


def load_state() -> dict:
    if STATE_PATH.exists():
        try:
            return json.loads(STATE_PATH.read_text(encoding="utf-8"))
        except Exception:
            pass
    return {}


def save_state(state: dict) -> None:
    STATE_PATH.write_text(json.dumps(state, indent=2), encoding="utf-8")


def get_nginx_pid() -> int:
    for p in NGINX_PID_PATHS:
        if p.exists():
            try:
                return int(p.read_text(encoding="utf-8").strip())
            except Exception:
                pass
    return 0


def update_central_manifest(owner_user: str) -> None:
    manifest = {
        "schema_version": "1.0",
        "app_name": "manciastudios-site",
        "version": APP_VERSION,
        "runtime": "systemd",
        "service_name": "nginx.service",
        "owner_user": owner_user,
        "port": 443,
        "health_url": "https://manciastudios.com/health",
        "public_url": "https://manciastudios.com",
        "environment": "producao",
        "logs_db_path": str(DB_PATH),
        "protected": True,
        "pid": get_nginx_pid(),
        "updated_at": datetime.datetime.now(datetime.timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ"),
    }
    MANIFEST_PATH.write_text(json.dumps(manifest, indent=2), encoding="utf-8")


def read_new_lines(log_path: Path, state: dict, key: str) -> list[str]:
    if not log_path.exists():
        return []
    stat = log_path.stat()
    inode = stat.st_ino
    size = stat.st_size

    prev = state.get(key, {})
    offset = prev.get("offset", 0)
    if prev.get("inode") != inode or size < offset:
        offset = 0

    lines: list[str] = []
    with log_path.open("r", encoding="utf-8", errors="replace") as f:
        f.seek(offset)
        for line in f:
            s = line.strip()
            if s:
                lines.append(s)
        new_offset = f.tell()

    state[key] = {"inode": inode, "offset": new_offset}
    return lines


def main() -> None:
    conn = sqlite3.connect(str(DB_PATH))
    conn.execute("PRAGMA journal_mode=WAL;")
    conn.execute("PRAGMA synchronous=NORMAL;")
    conn.execute("""
    CREATE TABLE IF NOT EXISTS logs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        timestamp TEXT NOT NULL,
        level TEXT DEFAULT 'INFO',
        source TEXT,
        message TEXT NOT NULL,
        raw_line TEXT,
        created_at TEXT DEFAULT (datetime('now', 'localtime'))
    );
    """)
    conn.execute("CREATE INDEX IF NOT EXISTS idx_logs_timestamp ON logs(timestamp);")
    conn.execute("CREATE INDEX IF NOT EXISTS idx_logs_level ON logs(level);")

    state = load_state()
    rows: list[tuple[str, str, str, str, str]] = []

    for line in read_new_lines(ACCESS_LOG, state, "access"):
        m = ACCESS_RE.match(line)
        if m:
            status = int(m.group("status"))
            if status >= 500:
                lvl = "ERROR"
            elif status >= 400:
                lvl = "WARNING"
            else:
                lvl = "INFO"
            ts = parse_nginx_access_ts(m.group("ts"))
            msg = f"[{status}] {m.group('req')} ({m.group('ip')}) — UA: {m.group('ua')[:120]}"
        else:
            lvl = "INFO"
            ts = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
            msg = line[:300]
        rows.append((ts, lvl, "nginx-access", msg, line))

    for line in read_new_lines(ERROR_LOG, state, "error"):
        m = ERROR_RE.match(line)
        if m:
            raw_lvl = m.group("lvl").lower()
            lvl = "ERROR" if raw_lvl in ("error", "crit", "alert", "emerg") else "WARNING"
            ts = parse_nginx_error_ts(m.group("ts"))
            msg = m.group("msg")
        else:
            lvl = "ERROR"
            ts = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
            msg = line[:300]
        rows.append((ts, lvl, "nginx-error", msg, line))

    if rows:
        with conn:
            conn.executemany(
                "INSERT INTO logs (timestamp, level, source, message, raw_line) VALUES (?, ?, ?, ?, ?)",
                rows,
            )

    save_state(state)
    conn.close()

    try:
        import pwd
        default_owner = pwd.getpwuid(Path(__file__).resolve().stat().st_uid).pw_name
    except Exception:
        default_owner = "www-data"
    owner_user = os.environ.get("MANCIA_OWNER_USER", default_owner)
    update_central_manifest(owner_user)


if __name__ == "__main__":
    main()
