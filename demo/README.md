# Shared AI Concierge — BUILD-001 private demo

This is a **rules-only offline FAQ + non-identifying intake-draft prototype** shared at the UI layer between two independent products. **Not a live AI assistant.**

## Run
From the repository root:
\`\`\`
python -m http.server 8000
\`\`\`
Then open http://localhost:8000/demo/ (or open \`demo/index.html\` directly if the browser allows local scripts).

Run \`npm test\` for the offline safety tests (Node 18+; no dependencies needed).

## Walkthrough
1. Choose World Citizenship or Tax Genie.
2. Click a reviewed FAQ prompt; only fixed responses are displayed.
3. Choose four general, non-identifying intake categories.
4. Press **Generate draft**. The text is shown locally. Press **Copy** if you want to keep it.
5. No records are sent or persisted, no emails or calls are initiated.

## Release status
NOT CONNECTED: external AI, ManyChat, CRM, analytics, API, calendar, real intake form, upload, KYC, professional case review or paid services.

ALL BLOCKED until legal/privacy/security approval and independent production gate in each product. No merge or deploy authorization is implied by these files.
