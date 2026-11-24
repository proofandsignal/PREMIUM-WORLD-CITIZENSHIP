'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const c = require('../src/concierge.js');

test('distinct product answers do not cross-route', () => {
  const pwc = c.questions('pwc');
  const tax = c.questions('taxgenie');
  assert.ok(pwc.some(q => q.title.includes('bank')));
  assert.ok(tax.some(q => q.title.includes('Tax Genie')));
  assert.ok(!tax.some(q => q.title.includes('second passport')));
});
test('tax and banking answers make no outcome promises', () => {
  assert.match(c.answer('pwc','bank').answer, /no account opening is guaranteed/i);
  assert.match(c.answer('taxgenie','refund').answer, /no amount or outcome/i);
  assert.equal(c.answer('pwc','bank').decision, false);
});
test('unknown questions require human handoff, not fabricated answers', () => {
  const a = c.answer('pwc','what-is-my-tax-refund');
  assert.equal(a.handoff,true);
  assert.equal(a.decision,false);
  assert.match(a.answer,/qualified human review/i);
});
test('drafts contain only controlled categorical answers, no personal details', () => {
  for (const product of ['pwc','taxgenie']) {
    const fields = c.fields(product);
    const selections = Object.fromEntries(fields.map(f=>[f.key,f.options[0]]));
    const text = c.summary(product,selections);
    assert.match(text,/NOT SENT/);
    assert.ok(!text.includes('undefined'));
    assert.ok(!/john@example|passport number|bank statement/i.test(text));
  }
});
test('unrecognized free text in intake is rejected', () => {
  const product='pwc';
  const selections=Object.fromEntries(c.fields(product).map(f=>[f.key,f.options[0]]));
  selections.stage='Please approve my citizenship';
  assert.throws(()=>c.summary(product,selections),/approved option/);
});
test('missing answers are rejected instead of inferred', () => {
  assert.throws(()=>c.summary('taxgenie',{}),/approved option/);
});
test('static demo has no server endpoint, analytics, external JS or browser storage', () => {
  const contents=['demo/index.html','demo/app.js','src/concierge.js'].map(p=>fs.readFileSync(path.join(__dirname,'..',p),'utf8')).join('\n');
  assert.doesNotMatch(contents,/localStorage|sessionStorage|indexedDB|sendBeacon|XMLHttpRequest|fetch\s*\(|https?:\/\/[^"']+\.js/);
  assert.match(contents,/connect-src 'none'/);
});
