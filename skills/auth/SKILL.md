---
name: auth
description: Create or reuse a GitHub SSH key, add it to ssh-agent, register it with GitHub via gh, and verify SSH access. Use when asked to “fix SSH”, “SSH key”, or “GitHub auth”.
---

# Auth: GitHub SSH Key

Run:

```bash
bash skills/auth/scripts/setup-github-ssh-key.sh --title "<key-title>" --email "<email-or-label>"
```

If you truly need to replace an existing key:

```bash
bash skills/auth/scripts/setup-github-ssh-key.sh --force --title "<key-title>" --email "<email-or-label>"
```
