# BUILD-001 — Shared AI Concierge architecture

## Decision
A **shared presentation and knowledge-routing layer**, not a shared customer database or a single mixed product. Brand owner remains distinct:
- Premium World Citizenship — **TrendSolutions**.
- Tax Genie — **Proof & Signal**; its independent GitHub repo and all previous security/release gates stay intact.

## Operating flow
\`CHANNEL → BRAND SELECT → VERSIONED FAQ → GENERAL ANSWER OR HUMAN HANDOFF → PRODUCT-SPECIFIC MINIMAL INTAKE → EXPLICIT SEND (future) → HUMAN QUALIFICATION\`

### In BUILD-001
- \`src/concierge.js\`: reviewed FAQ templates and categorical intake definitions for each product.
- \`demo/index.html\` + \`demo/app.js\` + \`demo/styles.css\`: offline static demo. No AI model, analytics, cookies, network operations, CRM or storage.
- Client selects a product, one predefined question, and four **non-identifying** categories. A summary is created in browser memory, shown to the visitor and can be manually copied.
- The summary is **NOT SENT**, even if the user presses Generate. No emails, phone numbers, names, documents, amounts, tax IDs or custom free-text. Refresh clears all choices.
- Unsupported queries go to the *human-review-needed* message; no invented factual answers.
- **No automated eligibility, banking, residency, citizenship, tax or VAT conclusions.**

## Proposed production components (NOT BUILT / NOT CONNECTED)
1. Routing layer preserving \`product_id\`, language, knowledge-version, source URL and update timestamp.
2. Retrieval of verified approved product knowledge only; citations and an explicit "cannot verify" fallback.
3. Consent/notice flow and secure product-specific HTTPS intake endpoints with identity-appropriate access controls.
4. Isolated encryption keys, database namespaces, access roles, retention and deletion for each brand; no cross-product sharing absent appropriate notices/lawful basis.
5. Human-operator queue and audited handoff with escalation for regulated questions.
6. Optional ManyChat adapter. ManyChat holds only limited routing metadata; **never client tax/identity documents**.
7. Rate limiting, anti-abuse, prompt-injection controls, logging redaction, breach procedures, independent privacy/legal/security review.

## Intake design — no real client data yet
**PWC** asks role, service topic, geographic region and research stage. **Tax Genie** asks role, general tax/fee category, geographic region and process stage. These are *triage classifications*, **not legal eligibility assessments**.

Future production form may request preferred contact address after a clearly identified controller, transparent privacy notice and approved legal basis/retention. Do NOT launch the contact form as a server endpoint using this demo.

## Success metrics
Track *manually* until privacy/security signoff: questions covered, product choice, human-review requests, usability findings. Later opt-in funnel: qualified requests → human review → legally scoped partner referrals → verified paid outcomes. No fictitious customer results.

## Quality / safety gate
\`OFFLINE QA → CONTENT FACT-CHECK → HUMAN REVIEW → PRIVACY LEGAL SIGNOFF → SECURITY TEST → PROTECTED HTTPS → SAMSUNG QA → OWNER APPROVAL\`

No merge to main or deploy in BUILD-001. Tax Genie \`BUILD-021/022\` and other reviews remain independent.
