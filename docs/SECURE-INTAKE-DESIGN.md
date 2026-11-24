# BUILD-001 / SECURE INTAKE DESIGN — SPECIFICATION ONLY

**Status:** DESIGN DRAFT — NO LIVE FORM ENDPOINT, NO REAL PERSONAL DATA, NO DATABASE, NO CRM, NO EXTERNAL AI, NO MANYCHAT CONNECTION.

## 1. Separation and responsibility
- PWC (TrendSolutions) and Tax Genie (Proof & Signal) are different products with separate service purposes, applicable legal gates and technical repositories. A shared web widget does not mean shared case access or client profiles.
- Identify the **actual legal entity/controller** for each service before any contact data is collected. Product/brand names alone are not legal controllers.
- Each brand requires approved transparency notice, lawful-basis assessment, processor / subprocessor contracts where applicable, retention schedule, rights request process, contact route and documented human review.
- No sharing requests between products by default. A customer may deliberately start a separate request and receive a separate notice. No implied opt-in from switching tabs.
- Do not assume GDPR consent is the correct lawful basis for every processing purpose; evaluate lawful basis for each specific operation.

## 2. Data stages and product gates

| Stage | Fields | Persistence | Current status |
|-------|--------|-------------|----------------|
| 0: FAQ | Selected brand + fixed question ID | Browser memory only | Built |
| 1: Anonymous triage | 4 enumerated non-identifying categories (role, topic, broad region, stage) | Browser memory only; explicit Copy | Built |
| 2: Contact request | Contact method + minimal routing data, after specific notice and active submission | Dedicated isolated secure endpoint, not yet selected | HOLD |
| 3: Case review | Documents / identification, only where demonstrably needed | Separate authorized professional workflow, **never** ManyChat or public repository | HOLD |
| 4: Partner referral | Minimum necessary details, explicit purpose and appropriate lawful basis | Audited human-authorized transfer to vetted third party | HOLD |

**Caution:** Even apparently non-identifying categories can become personal data if connected to identifiers, cookie IDs or transcript metadata; production design must re-evaluate identifiability.

## 3. Future request contract (NO implementation authorization)

Proposed HTTPS POST \`/v1/intake\` behind product-specific deployment and rate limiting. Do **not** introduce this endpoint without review. Conceptual allowlist:

\`\`\`json
{
  "schema_version": "intake-v1",
  "product_id": "pwc",
  "topic_code": "international_banking",
  "region_code": "eu_eea",
  "stage_code": "researching",
  "role_code": "business_owner",
  "contact": {
    "reply_channel": "email",
    "address": "<not permitted in current demo>"
  },
  "notice_version": "approved-notice-version",
  "notice_acknowledged": true
}
\`\`\`

- Product IDs: strictly \`pwc | taxgenie\`, validated server-side.
- All categoricals: immutable versioned enumerations; unknown values → HTTP 422, fail closed.
- Acknowledged notice is evidence of delivery/reading acknowledgment only; it does not automatically establish lawful consent.
- API returns opaque \`case_ref\` with **no eligibility score, estimated refund or bank-approval promise**.
- Disallow free-text narrative, attachments, documents, tax IDs, wallet keys, banking details, passport/identity numbers or financial amounts at initial intake.
- Never trust client-supplied \`product_id\` for authorization, tenant selection, tenant routing or storage. The server independently binds allowed audience/hostname/token and product, using segregated storage.
- No automatic referral or automated marketing opt-in. Marketing preferences must be separate where required.
- Future submission requires explicit Submit button; browser-only Generate is not submission.
- Avoid logging request bodies, raw contact details, chatbot transcripts, referrer query strings or access tokens.

## 4. Engineering controls required before building Stage 2
- HTTPS-only, strong CSP, CSRF protections appropriate to auth design, origin restrictions, anti-spam and rate limits with abuse handling.
- Separate product storage, access controls and encryption keys; least privilege; tenant isolation tests; server-side schema allowlist; key rotation; at-rest and in-transit protections.
- Privacy-safe structured logs with sensitive redaction, restricted access, bounded retention, incident response and deletion workflows.
- Legal/Privacy review for role as controller/processor, third-country transfers, recipient and retention policies; DPIA screening and review of applicable EU and international rules.
- Clear human escalation / support hours, complaint and privacy request path.
- Automated abuse tests: malicious payload, XSS, server-side injection, oversized input, missing notice, forced product switch, replay, cross-product access, rate limit and timeout.
- AI FAQ must rely on verified versioned sources and refuse unsupported case-specific answers. No AI-generated legal or immigration decisions; no action tools to submit applications or move files.
- Optional ManyChat route transfers only minimal consented routing metadata after channel/vendor review; never use ManyChat for ID/tax paperwork.

## 5. Acceptance checklist (future Stage 2)
- [ ] The legal controller for **each product** is identified and documented.
- [ ] Notice, lawful basis, DPA, retention and rights workflow reviewed.
- [ ] Human reviewer and secure partner onboarding process assigned.
- [ ] Schema validation, product isolation and permission tests PASS.
- [ ] Sensitive-file / free-text routes blocked; upload disabled.
- [ ] Independent security and privacy review PASS.
- [ ] Manual user approval for any real-client intake deployment.

Until then: **NO CLIENT DATA / NO REAL SUBMISSION / MERGE & DEPLOY HOLD**.

## References (design context, not proof of legal compliance)
- European Commission GDPR principles: https://commission.europa.eu/law/law-topic/data-protection/information-business-and-organisations/principles-gdpr_en
- EDPB data protection by design: https://www.edpb.europa.eu/sme/be-compliant/be-compliant_en
- OWASP LLM risks: https://genai.owasp.org/llm-top-10/
