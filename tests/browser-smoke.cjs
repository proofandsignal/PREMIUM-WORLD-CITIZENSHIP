'use strict';
// Browser smoke QA for the exact GitHub branch content (not a deployment).
const {chromium}=require('playwright');
const assert=require('node:assert/strict');
const path=require('node:path');
const fs=require('node:fs');
const {pathToFileURL}=require('node:url');

async function run() {
  fs.mkdirSync('artifacts',{recursive:true});
  const browser=await chromium.launch({headless:true});
  const errors=[],networkRequests=[];
  try {
    for (const config of [
      {name:'desktop',width:1440,height:900,isMobile:false},
      {name:'samsung-mobile',width:412,height:915,isMobile:true},
      {name:'narrow-mobile',width:360,height:780,isMobile:true}
    ]) {
      const context=await browser.newContext({viewport:{width:config.width,height:config.height},isMobile:config.isMobile,deviceScaleFactor:1});
      const page=await context.newPage();
      page.on('pageerror',e=>errors.push(config.name+': '+e.message));
      page.on('request',r=>{if(!r.url().startsWith('file:'))networkRequests.push(r.url());});
      await page.goto(pathToFileURL(path.resolve('demo/index.html')).href,{waitUntil:'load'});
      assert.equal(await page.title(),'Shared Concierge | Premium World Citizenship × Tax Genie — Private Demo');
      assert.equal(await page.locator('#question-buttons button').count(),4);
      await page.getByRole('button',{name:/Can I open an international bank account/}).click();
      assert.match(await page.locator('#answer').innerText(),/no account opening is guaranteed/i);
      await page.getByRole('button',{name:/Tax Genie/}).click();
      assert.equal(await page.locator('#question-buttons button').count(),4);
      await page.getByRole('button',{name:/How much tax can I recover/}).click();
      assert.match(await page.locator('#answer').innerText(),/No amount or outcome/i);
      await page.getByRole('button',{name:'Generate draft'}).click();
      assert.match(await page.locator('#feedback').innerText(),/Complete all selections/i);
      await page.locator('#intake select').first().selectOption({index:1});
      for(let i=1;i<4;i++) await page.locator('#intake select').nth(i).selectOption({index:1});
      await page.getByRole('button',{name:'Generate draft'}).click();
      assert.equal(await page.locator('#summary-area').isVisible(),true);
      assert.match(await page.locator('#summary').inputValue(),/DEMO INTAKE DRAFT — NOT SENT/);
      await page.getByRole('button',{name:'Clear'}).click();
      assert.equal(await page.locator('#summary-area').isVisible(),false);
      assert.equal(await page.locator('#intake select').first().inputValue(),'');
      const over=await page.evaluate(()=>document.documentElement.scrollWidth-window.innerWidth);
      assert.ok(over<=2,config.name+' horizontal overflow '+over+'px');
      await page.screenshot({path:'artifacts/pwc-'+config.name+'.png',fullPage:true});
      console.log(config.name+' PASS: 2 product modes, FAQ, required categories, reset, responsive width');
      await context.close();
    }
    assert.deepEqual(errors,[],'browser JS errors');
    assert.deepEqual(networkRequests,[],'no network/API/analytics requests');
    console.log('Browser QA PASS: no JS errors or external network requests');
  } finally {
    await browser.close();
  }
}
run().catch(e=>{console.error(e);process.exitCode=1;});
