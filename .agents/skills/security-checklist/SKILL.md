---
name: security-checklist
description: OWASP ASVS and XSS defense checklist for live chat streaming suites.
---

# Security & Compliance Checklist

## Inbound Chat Data Sanitization
- [ ] Render strings using `.textContent` only.
- [ ] Filter out non-printable ASCII, Unicode RTL overrides, and control characters.
- [ ] Truncate usernames and slot names to maximum 32 characters.
- [ ] Strip raw URLs from chat commands.

## Secret Management
- [ ] No API keys, passwords, or tokens in git.
- [ ] Secrets stored in `.dev.vars` locally and environment variables in deployment.
- [ ] Run regular git scans to ensure clean commits.

## Legal & Compliance Disclaimers
- [ ] +18 notice visible on overlays.
- [ ] Responsible gambling message displayed.
- [ ] 100% free participation terms clearly stated.
