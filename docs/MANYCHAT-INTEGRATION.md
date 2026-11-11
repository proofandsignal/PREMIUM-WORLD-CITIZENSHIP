# ManyChat / human agent integration — SPEC ONLY

**Not active. No API keys, external requests, Instagram accounts or contact data are connected in BUILD-001.**

## Channels
Website first. Instagram/ManyChat later, only after authorized business-account connection and marketing/communications compliance.

## Proposed journey
1. ManyChat welcome: identify automated assistant and product, with choice **Premium World Citizenship / Tax Genie / Human operator**.
2. Serve short reviewed FAQ for the selected brand. Unknown/high-stakes questions offer an approved human handoff.
3. Ask **general non-identifying categories only**: product, topic, broad region, stage. Avoid passports, financial figures, tax details, invoices, banks, secret keys or customer identity docs in DMs.
4. Offer a secure HTTPS form **only after** an approved privacy notice, lawful basis, roles, retention schedule and independent security review.
5. Authorized human reviews and may reply via an approved channel. **No auto-decision and no automatic partner transmission**.

## Suggested minimal fields for later integration
\`product_id: pwc | taxgenie\`
\`topic_code: enumerated non-sensitive topic\`
\`region_code: broad non-sensitive region\`
\`workflow_state: faq | wants_human | form_offered\`
\`knowledge_version: verified version\`

Do not store shared customer profiles across brands without lawful basis, transparent notices and suitable agreements. Do not forward unredacted conversation transcripts to third parties by default.

## Implementation note
Official ManyChat documentation supports custom user fields, Dynamic Blocks and HTTP external requests on eligible plans. External requests can send information to an HTTPS endpoint; they do **not** make our service secure by themselves. Enable only after data flow review, authentication, no credentials in the client, redacted audit logs and dedicated endpoint testing.

- https://help.manychat.com/en/articles/17742126-dev-tools-external-request
- https://help.manychat.com/en/articles/17741999-custom-user-fields-and-bot-fields
- https://help.manychat.com/en/articles/17741886-how-to-connect-instagram-to-manychat
- GDPR information rights: https://commission.europa.eu/law/law-topic/data-protection/information-individuals_en

## Escalation to human
- Requests for specific tax refund outcome, VAT eligibility, account approval, residency/citizenship eligibility.
- Legal interpretation, active disputes, complaint, medical/identity/vulnerable-client documents.
- Conflicting source information or unknown questions.
- Request to delete personal data, or any privacy/security problem.

### Launch checklist
- [ ] Verified knowledge and sources with review dates
- [ ] Human operator and business hours / fallback message
- [ ] Language coverage and safe content review
- [ ] Data controller(s), approved privacy notice, lawful basis and DPA if needed
- [ ] Secure intake endpoint, privacy/security test, retention policy
- [ ] Human escalation acceptance tests
- [ ] Instagram/ManyChat channel + account eligibility verified
- [ ] Owner deployment authorization
