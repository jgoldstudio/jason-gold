---
name: setup
description: One-command GitHub + Codex bootstrap for a non-technical user. Installs GitHub CLI if needed, signs into GitHub, sets up git integration, creates/registers an SSH key, and writes a completion marker.
---

# Setup: GitHub + Codex (Home)

Run:

```bash
bash skills/setup/scripts/bootstrap-home-codex-setup.sh
```

Notes:
- Safe to re-run.
- Uses browser-based GitHub login if not signed in.
- SSH key creation is non-destructive by default (won’t overwrite an existing key unless you use `--force`).
