const puppeteer = require('puppeteer');
const CREDS = require('./creds2');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const mongoose = require('mongoose');
const User = require('./models/user.js');
const fs = require('fs');
const { argv } = require('process');

// ????? ycombinator also.

async function run() {
  const browser = await puppeteer.launch({
    headless: false
  });

  const page = await browser.newPage();

  // await page.goto('https://github.com');
  // await page.screenshot({ path: 'screenshots/github.png' });

  await page.goto('https://facebook.com/');

  // dom element selectors
  const USERNAME_SELECTOR = '#email';
  const PASSWORD_SELECTOR = '#pass';
  const BUTTON_SELECTOR = '#content > div > div._8esj._95k9._8esf._8opv._8f3m._8ilg._8icx._8op_._95ka > div._8esk > div._8esn > div._8iep._8icy._9ahz._9ah- > div._6luv._52jv > form > div._6ltg > button';

  await page.click(USERNAME_SELECTOR);
  await page.keyboard.type(CREDS.email);

  await page.click(PASSWORD_SELECTOR);
  await page.keyboard.type(CREDS.password);

  await Promise.all([
    page.click(BUTTON_SELECTOR),
    page.waitForNavigation()
  ]);

//   https://www.facebook.com/search/top?q=nabil
  const userToSearch = argv[2];
  const searchUrl = `https://www.facebook.com/search/people/?q=${userToSearch}`;
  // let searchUrl = 'https://github.com/search?utf8=%E2%9C%93&q=bashua&type=Users';

  await page.goto(searchUrl);
  await page.waitForTimeout(2 * 1000); // ??? WHY IS THIS DESPITE await


  await page.setViewport({
    width: 1200,
    height: 800
  });


 


  // const LIST_USERNAME_SELECTOR = '#user_search_results > div.user-list > div:nth-child(1) div.d-flex > div > a';
  const PUBLIC_POST_SELECTOR = '.xdj266r.x11i5rnm.xat24cr.x1mh8g0r.x1vvkbs.x126k92a'; // ??? (INDEX) div.user-list? div:nth-child(INDEX)
  // const LIST_EMAIL_SELECTOR = '#user_search_results > div.user-list > div:nth-child(1) > div.flex-auto > div.d-flex.flex-wrap.text-small.text-gray > div:nth-child(2) > a'
  const LIST_EMAIL_SELECTOR = '#user_search_results > div.user-list > div:nth-child(INDEX) > div.flex-auto > div.d-flex.flex-wrap.text-small.text-gray > div:nth-child(2) > a'
  const LENGTH_SELECTOR_CLASS = ''
  // document.querySelectorAll('#content > div > div._8esj._95k9._8esf._8opv._8f3m._8ilg._8icx._8op_._95ka > div._8esk > div._8esn > div._8iep._8icy._9ahz._9ah- > div._6luv._52jv > form > div._6ltg > button');



  // document.querySelectorAll('div.x78zum5.xdt5ytf.xz62fqu.x16ldp7u > div.xu06os2.x1ok221b > span > div > a.x1i10hfl.xjbqb8w.x6umtig.x1b1mbwd.xaqea5y.xav7gou.x9f619.x1ypdohk.xt0psk2.xe8uvvx.xdj266r.x11i5rnm.xat24cr.x1mh8g0r.xexx8yu.x4uap5.x18d9i69.xkhd6sd.x16tdsg8.x1hl2dhg.xggy1nq.x1a2a7pz.xt0b8zv.xzsf02u.x1s688f');

  //   let listLength = await page.evaluate((sel) => {
//     return document.getElementsByClassName(sel).length;
//   }, LENGTH_SELECTOR_CLASS);

//   console.log(listLength);


    // change the index to the next child
    console.log("Ami asi");

    RANDOM_CLICK = 'div.x9f619.x193iq5w.x1miatn0.xqmdsaz.x1gan7if.x1xfsgkm'

    // page.scrollBy(0, 700);
    await page.click(RANDOM_CLICK);
    await page.keyboard.press("PageDown");
    await page.waitForTimeout(1 * 1000);
    await page.keyboard.press("PageDown");
    await page.waitForTimeout(2 * 1000);
    await page.keyboard.press("PageDown");
    await page.waitForTimeout(2 * 1000);
    // await page.keyboard.press("PageDown");
    // await page.waitForTimeout(2 * 1000);
    // await page.keyboard.press("PageDown");
    // await page.waitForTimeout(2 * 1000);
    // await page.keyboard.press("PageDown");
    // await page.waitForTimeout(2 * 1000);
    // await page.keyboard.press("PageDown");


    // not all users have emails visible
      let urls = [];

      let newUrls = await page.evaluate(() => {
      let results = [];
      
      

      let items = document.querySelectorAll('div.x78zum5.xdt5ytf.xz62fqu.x16ldp7u > div.xu06os2.x1ok221b > span > div > a.x1i10hfl.xjbqb8w.x6umtig.x1b1mbwd.xaqea5y.xav7gou.x9f619.x1ypdohk.xt0psk2.xe8uvvx.xdj266r.x11i5rnm.xat24cr.x1mh8g0r.xexx8yu.x4uap5.x18d9i69.xkhd6sd.x16tdsg8.x1hl2dhg.xggy1nq.x1a2a7pz.xt0b8zv.xzsf02u.x1s688f');
      
      items.forEach((item) => {
          results.push({
              url:  item.getAttribute('href'),
              text: item.innerText,
          });
      });
      
      
      return results;
    });

    urls = urls.concat(newUrls);



  
  const csvWriter = createCsvWriter({
    path: 'usernames.csv',
    header: [
      { id: 'text', title: 'idName' },
      { id: 'url', title: 'profileURL' }
    ]
  });
  
  csvWriter
    .writeRecords(urls)
    .then(() => console.log('CSV file "usernames.csv" has been created successfully.'))
    .catch((err) => console.error('Error writing CSV file:', err));


    const regex = /^(?!.*php).*$/;

    for (const obj of urls) {
      const url = obj.url;
      if (regex.test(url)) {
        console.log(url);
        await page.goto(url);
         await page.waitForTimeout(2 * 1000);
        break;
      }
    }

  
    console.log("Amrao asi");
    RANDOM_CLICK2 = ('div.x6s0dn4.x78zum5.xvrxa7q.x9w375v.xxfedj9.x1roke11.x1es02x0');
    
    // page.scrollBy(0, 700);
    await page.click(RANDOM_CLICK2);

    await page.waitForTimeout(1 * 1000);


    await page.keyboard.press("PageDown");
    await page.waitForTimeout(1 * 1000);
    await page.keyboard.press("PageDown");
    await page.waitForTimeout(1 * 1000);
    await page.keyboard.press("PageDown");
    await page.waitForTimeout(1 * 1000);
    await page.keyboard.press("PageDown");
    await page.waitForTimeout(2 * 1000);
    await page.keyboard.press("PageDown");
    await page.waitForTimeout(2 * 1000);
    await page.keyboard.press("PageDown");
    await page.waitForTimeout(2 * 1000);
    await page.keyboard.press("PageDown");
    await page.keyboard.press("PageDown");
    await page.keyboard.press("PageDown");
    await page.keyboard.press("PageDown");
    await page.keyboard.press("PageDown");
    await page.waitForTimeout(2 * 1000);
    await page.keyboard.press("PageDown");
    await page.waitForTimeout(2 * 1000);
    await page.keyboard.press("PageDown");
    await page.waitForTimeout(2 * 1000);
    await page.keyboard.press("PageDown");
    console.log("Tomra ki aso?");

    await page.waitForTimeout(2 * 1000);

  

 



    const elements = await page.$$('div.x1i10hfl.xjbqb8w.x6umtig.x1b1mbwd.xaqea5y.xav7gou.x9f619.x1ypdohk.xt0psk2.xe8uvvx.xdj266r.x11i5rnm.xat24cr.x1mh8g0r.xexx8yu.x4uap5.x18d9i69.xkhd6sd.x16tdsg8.x1hl2dhg.xggy1nq.x1a2a7pz.xt0b8zv.xzsf02u.x1s688f');


    // await page.waitForSelector(elements);
    // page.click('.class_2');


    await page.waitForTimeout(2 * 1000);


    // await page.evaluate(() => {
    //   [...document.querySelectorAll('div.x1i10hfl.xjbqb8w.x6umtig.x1b1mbwd.xaqea5y.xav7gou.x9f619.x1ypdohk.xt0psk2.xe8uvvx.xdj266r.x11i5rnm.xat24cr.x1mh8g0r.xexx8yu.x4uap5.x18d9i69.xkhd6sd.x16tdsg8.x1hl2dhg.xggy1nq.x1a2a7pz.xt0b8zv.xzsf02u.x1s688f')].click();
    // });

    const divElements = await page.$$('div.x1i10hfl.xjbqb8w.x6umtig.x1b1mbwd.xaqea5y.xav7gou.x9f619.x1ypdohk.xt0psk2.xe8uvvx.xdj266r.x11i5rnm.xat24cr.x1mh8g0r.xexx8yu.x4uap5.x18d9i69.xkhd6sd.x16tdsg8.x1hl2dhg.xggy1nq.x1a2a7pz.xt0b8zv.xzsf02u.x1s688f');


    // let see_more = [];
    // for(let t of divElements) {
    //   see_more.push(await t.evaluate(x => x.textContent));
    // }


    
 
    
    // for (let i = 0; i < divClasses.length; i++) {
    //   const divElement = await page.$(divClasses[i]);
    //   await divElement.click();
    //   await page.waitForTimeout(2000); // Wait for some time (e.g., 2000 milliseconds)
    //   const textContent = await divElement.evaluate(x => x.textContent);
    //   see_more.push(textContent);
    // }

// -------------------------
    let see_more = [];
    for(let t of divElements) {
        see_more.push(await t.evaluate(x => {
          x.click();
        }));
    }
// -------------------------







    await page.waitForTimeout(2 * 1000);
    // page.scrollBy(0, 700);
    
    RANDOM_CLICK3 = ('.x1n2onr6.x1ja2u2z.x78zum5.x2lah0s.xl56j7k.x6s0dn4.xozqiw3.x1q0g3np.xi112ho.x17zwfj4.x585lrc.x1403ito.x972fbf.xcfux6l.x1qhh985.xm0m39n.x9f619.xbxaen2.x1u72gb5.xtvsq51.x1r1pt67');

    // console.log(RANDOM_CLICK3);
    if(RANDOM_CLICK3.innerText != null) {
      await page.click(RANDOM_CLICK3);
      await page.waitForTimeout(2 * 1000);
    }


    const classSelector = '.x193iq5w.xeuugli.x13faqbe.x1vvkbs.x10flsy6.x1lliihq.x1s928wv.xhkezso.x1gmr53x.x1cpjm7i.x1fgarty.x1943h6x.x4zkp8e.x41vudc.x6prxxf.xvq8zen.xo1l8bm.xzsf02u.x1yc453h';

    const elems = await page.$$(classSelector);
    const posts = {};
    
    for (let i = 0; i < elems.length; i++) {
      const elem = elems[i];
      const textContent = await elem.evaluate(el => el.innerText);
      posts[`publicPost${i}`] = textContent;
    }
    
    // console.log(posts);

    // IMPORTANT_SPAN_CLASS = document.querySelectorAll('.x193iq5w.xeuugli.x13faqbe.x1vvkbs.x10flsy6.x1lliihq.x1s928wv.xhkezso.x1gmr53x.x1cpjm7i.x1fgarty.x1943h6x.x4zkp8e.x41vudc.x6prxxf.xvq8zen.xo1l8bm.xzsf02u.x1yc453h');


    // console.log(divElements);
  // for (const divElement of divElements) {
  //   console.log(divElement);
  //   await divElement.click();
  //   await page.waitForTimeout(2000); // Wait for some time (e.g., 2000 milliseconds)
  // }



    
    console.log(posts);

    // console.log(publicPost);


    // Convert the data to JSON string
    const jsonData = JSON.stringify(posts, null, 2);

    // Specify the file path where you want to save the JSON data
    const filePath = 'publicPosts.json';

    // Save the JSON data to the file
    fs.writeFileSync(filePath, jsonData);

    console.log('Data saved to JSON file:', filePath);






    POST_URL_DIV = 'div.xdj266r.x11i5rnm.xat24cr.x1mh8g0r.x1vvkbs.x126k92a';
  // browser.close();
}







run(5).then(console.log).catch(console.error);






// search_url = https://www.facebook.com/search/top/?q=nabil

// x9f619 x1n2onr6 x1ja2u2z xdt5ytf x193iq5w xeuugli x1r8uery x1iyjqo2 xs83m0k x78zum5 x1t2pt76