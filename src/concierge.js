/* Shared AI Concierge — BUILD-001 rules-only, offline, demo, no AI API or data collection. */
(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.PWCConcierge = api;
})(typeof window === 'undefined' ? globalThis : window, function () {
  'use strict';
  const DISCLOSURE = 'Educational information only. No legal, tax, immigration or banking advice; no eligibility or refund decision.';
  const FAQ = Object.freeze({
    pwc: [
      { id: 'what', title: 'What can Premium World Citizenship help me explore?', answer: 'We provide research starting points for lawful international banking, mobility, residency, citizenship and international business. We do not arrange bank accounts or residency approvals in this demo.' },
      { id: 'bank', title: 'Can I open an international bank account?', answer: 'Eligibility depends on the provider, jurisdiction, residence, source-of-funds checks and product rules. Check the provider’s official criteria and seek qualified help where needed; no account opening is guaranteed.' },
      { id: 'citizenship', title: 'Can I get a second passport?', answer: 'Citizenship programmes and rules differ significantly. Only governments and their authorized processes determine approval. An authorized immigration adviser can review your individual case.' },
      { id: 'tax', title: 'Can an offshore account remove my tax obligations?', answer: 'No. International accounts may still be subject to domestic taxes, disclosures and information exchange. Seek advice from a qualified professional in the relevant jurisdictions.' }
    ],
    taxgenie: [
      { id: 'what', title: 'What is Tax Genie?', answer: 'Tax Genie — by Proof & Signal — is developing evidence-led tax and fee review workflows. The current concierge is informational and does not accept documents, calculate refunds or file claims.' },
      { id: 'vat', title: 'Could business VAT be recoverable?', answer: 'VAT recovery depends on the jurisdiction, claimant status, transaction facts, documentation and applicable law. A qualified adviser must assess the case. This demo cannot decide eligibility.' },
      { id: 'upload', title: 'Can I upload invoices or tax documents here?', answer: 'No. Real invoices, identity documents and tax identifiers are not accepted. Secure document intake is locked pending independent legal, privacy and security review.' },
      { id: 'refund', title: 'How much tax can I recover?', answer: 'No amount or outcome can be estimated from this demo. A documented, jurisdiction-specific professional review would be required before any refund claim.' }
    ]
  });
  const INTAKE = Object.freeze({
    pwc: [
      { key: 'role', label: 'I am', options: ['Individual', 'Business owner', 'Institution / professional'] },
      { key: 'service', label: 'Area of interest', options: ['International banking', 'Residency / citizenship', 'International business', 'General compliance research', 'Institutional partnership'] },
      { key: 'region', label: 'Region of interest', options: ['EU / EEA', 'Europe outside EU', 'Americas', 'Middle East', 'Asia-Pacific', 'Multiple / unsure'] },
      { key: 'stage', label: 'My stage', options: ['Researching options', 'Preparing for provider discussion', 'Seeking a verified professional', 'B2B partnership inquiry'] }
    ],
    taxgenie: [
      { key: 'role', label: 'I am', options: ['Individual', 'Company representative', 'Institution / professional'] },
      { key: 'service', label: 'Area of interest', options: ['VAT documentation question', 'Business expense / fee question', 'Cross-border tax process', 'Professional / B2B partnership'] },
      { key: 'region', label: 'Region of question', options: ['EU / EEA', 'Europe outside EU', 'Americas', 'Middle East', 'Asia-Pacific', 'Multiple / unsure'] },
      { key: 'stage', label: 'My stage', options: ['Exploring information', 'Preparing a professional review', 'Asking about future service access', 'B2B partnership inquiry'] }
    ]
  });
  function productKey(product) { return product === 'taxgenie' ? 'taxgenie' : 'pwc'; }
  function productLabel(product) { return productKey(product) === 'pwc' ? 'Premium World Citizenship — TrendSolutions' : 'Tax Genie — Proof & Signal'; }
  function questions(product) { return FAQ[productKey(product)].map(({id,title}) => ({id,title})); }
  function answer(product,id) {
    const record = FAQ[productKey(product)].find(x => x.id === id);
    return record ? { answer: record.answer, decision: false, handoff: false, disclaimer: DISCLOSURE }
      : { answer: 'I cannot verify that request in this demo. Please seek a qualified human review; no decision has been made.', decision: false, handoff: true, disclaimer: DISCLOSURE };
  }
  function fields(product) { return INTAKE[productKey(product)].map(f => ({ key:f.key, label:f.label, options:f.options.slice() })); }
  function summary(product, values) {
    const key = productKey(product);
    const chosen = fields(key).map(f => {
      const val = values && values[f.key];
      if (typeof val !== 'string' || !f.options.includes(val)) throw new Error('Please select an approved option for ' + f.label);
      return f.label + ': ' + val;
    });
    return ['DEMO INTAKE DRAFT — NOT SENT', productLabel(key), ...chosen, '', 'NEXT STEP: human review required. No legal/tax/banking/immigration eligibility assessment.', 'No contact details, private files or identifiers were collected by this demo.'].join('\n');
  }
  return Object.freeze({ questions, answer, fields, summary, productLabel, DISCLOSURE });
});
