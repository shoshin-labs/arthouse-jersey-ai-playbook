#!/usr/bin/env bash
set -euo pipefail

port="$(python3 - <<'PY'
import socket
for p in range(8093, 9000):
    s = socket.socket()
    try:
        s.bind(("127.0.0.1", p))
    except OSError:
        continue
    else:
        s.close()
        print(p)
        break
PY
)"

printf 'Serving on http://127.0.0.1:%s\n' "$port"
python3 -m http.server "$port" --directory "$(pwd)"
