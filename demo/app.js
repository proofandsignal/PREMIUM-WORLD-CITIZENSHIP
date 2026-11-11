'use strict';
(function () {
  const engine = window.PWCConcierge;
  const $ = id => document.getElementById(id);
  let product = 'pwc';
  function clearDraft() {
    $('summary-area').hidden = true;
    $('summary').value = '';
    $('feedback').textContent = '';
  }
  function setProduct(next) {
    product = next;
    $('switch-pwc').classList.toggle('selected',product === 'pwc');
    $('switch-tax').classList.toggle('selected',product === 'taxgenie');
    $('switch-pwc').setAttribute('aria-pressed',String(product === 'pwc'));
    $('switch-tax').setAttribute('aria-pressed',String(product === 'taxgenie'));
    $('answer').textContent = 'Select a topic to begin exploring.';
    $('human-notice').hidden = true;
    const buttons = $('question-buttons');
    buttons.replaceChildren();
    for (const q of engine.questions(product)) {
      const button = document.createElement('button');
      button.type = 'button';
      button.textContent = q.title;
      button.addEventListener('click', () => {
        const reply = engine.answer(product,q.id);
        $('answer').textContent = reply.answer;
        $('human-notice').hidden = !reply.handoff;
        buttons.querySelectorAll('button').forEach(b => b.classList.toggle('active',b === button));
      });
      buttons.appendChild(button);
    }
    const form = $('intake');
    form.replaceChildren();
    for (const field of engine.fields(product)) {
      const wrapper = document.createElement('div');
      wrapper.className = 'field';
      const label = document.createElement('label');
      label.htmlFor = 'field-' + field.key;
      label.textContent = field.label;
      const select = document.createElement('select');
      select.id = label.htmlFor;
      select.name = field.key;
      select.required = true;
      const placeholder = document.createElement('option');
      placeholder.value = '';
      placeholder.textContent = 'Select an option';
      select.appendChild(placeholder);
      for (const value of field.options) {
        const option = document.createElement('option');
        option.value = value;
        option.textContent = value;
        select.appendChild(option);
      }
      select.addEventListener('change',clearDraft);
      wrapper.append(label,select);
      form.appendChild(wrapper);
    }
    clearDraft();
  }
  $('switch-pwc').addEventListener('click', () => setProduct('pwc'));
  $('switch-tax').addEventListener('click', () => setProduct('taxgenie'));
  $('generate').addEventListener('click', () => {
    const form = $('intake');
    const values = Object.fromEntries(Array.from(form.elements).filter(e=>e.tagName === 'SELECT').map(e=>[e.name,e.value]));
    try {
      $('summary').value = engine.summary(product,values);
      $('summary-area').hidden = false;
      $('feedback').textContent = 'Draft generated locally. Nothing has been sent or stored.';
    } catch (error) {
      $('feedback').textContent = 'Complete all selections before generating a draft.';
    }
  });
  $('reset').addEventListener('click', () => { setProduct(product); });
  $('copy').addEventListener('click', async () => {
    const text = $('summary').value;
    if (!text) return;
    try {
      if (!navigator.clipboard || !window.isSecureContext) throw new Error('clipboard not available');
      await navigator.clipboard.writeText(text);
      $('feedback').textContent = 'Copied. No data sent by the website.';
    } catch (_) {
      $('summary').focus();
      $('summary').select();
      $('feedback').textContent = 'Select the draft and copy manually. Clipboard access is unavailable.';
    }
  });
  $('intake').addEventListener('submit', event => event.preventDefault());
  setProduct('pwc');
})();
