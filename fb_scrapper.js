const puppeteer = require('puppeteer');
const CREDS = require('./creds2');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const fs = require('fs');
const { argv } = require('process');


async function run() {
  const browser = await puppeteer.launch({
    headless: true,
    args: [
      "--disable-gpu",
      "--disable-dev-shm-usage",
      "--disable-setuid-sandbox",
      "--no-sandbox",
      "--single-process",
  ]
  });

  
  const page = await browser.newPage();
  await page.setDefaultNavigationTimeout(0);


  await page.goto('https://facebook.com/');

  // dom element selectors
  const USERNAME_SELECTOR = '#email';
  const PASSWORD_SELECTOR = '#pass';
  const BUTTON_SELECTOR = '#content > div > div._8esj._95k9._8esf._8opv._8f3m._8ilg._8icx._8op_._95ka > div._8esk > div._8esn > div._8iep._8icy._9ahz._9ah- > div._6luv._52jv > form > div._6ltg > button';


  async function scroll(numbers) {
    for (let i = 0; i < numbers; i++) {
      await page.keyboard.press("PageDown");
      await page.waitForTimeout(1 * 1000);
    }
  }

  await page.click(USERNAME_SELECTOR);
  await page.keyboard.type(CREDS.email);

  await page.click(PASSWORD_SELECTOR);
  await page.keyboard.type(CREDS.password);

  await Promise.all([
    page.click(BUTTON_SELECTOR),
    page.waitForNavigation()
  ]);

  const userToSearch = argv[2];
  const searchUrl = `https://www.facebook.com/search/people/?q=${userToSearch}`;

  await page.goto(searchUrl);
  await page.waitForTimeout(2 * 1000);


  await page.setViewport({
    width: 1200,
    height: 800
  });


  RANDOM_CLICK = 'div.x9f619.x193iq5w.x1miatn0.xqmdsaz.x1gan7if.x1xfsgkm'
  await page.click(RANDOM_CLICK);

  await scroll(3);
  

  async function generateProfileURLs(){
    let newUrls = await page.evaluate(() => {
    let results = [];

    let items = document.querySelectorAll('div.x78zum5.xdt5ytf.xz62fqu.x16ldp7u > div.xu06os2.x1ok221b > span > div > a.x1i10hfl.xjbqb8w.x6umtig.x1b1mbwd.xaqea5y.xav7gou.x9f619.x1ypdohk.xt0psk2.xe8uvvx.xdj266r.x11i5rnm.xat24cr.x1mh8g0r.xexx8yu.x4uap5.x18d9i69.xkhd6sd.x16tdsg8.x1hl2dhg.xggy1nq.x1a2a7pz.xt0b8zv.xzsf02u.x1s688f');

    items.forEach((item) => {
      results.push({
        url: item.getAttribute('href'),
        text: item.innerText,
      });
    });


    return results;
  });

  return newUrls;

}

  let urls = [];

  let newUrls =  await generateProfileURLs();

  urls = urls.concat(newUrls);



async function saveToCSV(urls, path){
  const csvWriter = createCsvWriter({
    path,
    header: [
      { id: 'text', title: 'idName' },
      { id: 'url', title: 'profileURL' }
    ]
  });

  csvWriter
    .writeRecords(urls)
    .then(() => console.log(`CSV file ${path} has been created successfully.`))
    .catch((err) => console.error('Error writing CSV file:', err));
}

  await saveToCSV(urls, 'usernames.csv');


  const regex = /^(?!.*php).*$/;

  for (const obj of urls) {
    const url = obj.url;
    if (regex.test(url)) {
      console.log(`Scrapping the infos from this profile ${url}`);
      await page.goto(url);
      await page.waitForTimeout(2 * 1000);
      break;
    }
  }

  // console.log("checkpoint 2")
  RANDOM_CLICK2 = ('div.x6s0dn4.x78zum5.xvrxa7q.x9w375v.xxfedj9.x1roke11.x1es02x0');

  await page.click(RANDOM_CLICK2);
  await page.waitForTimeout(1 * 1000);

  await scroll(10);

  
  await page.waitForTimeout(2 * 1000);

  


  // -------------------------

async  function clickSeeMore(){
  const divElements = await page.$$('div.x1i10hfl.xjbqb8w.x6umtig.x1b1mbwd.xaqea5y.xav7gou.x9f619.x1ypdohk.xt0psk2.xe8uvvx.xdj266r.x11i5rnm.xat24cr.x1mh8g0r.xexx8yu.x4uap5.x18d9i69.xkhd6sd.x16tdsg8.x1hl2dhg.xggy1nq.x1a2a7pz.xt0b8zv.xzsf02u.x1s688f');
  let see_more = [];
  for (let t of divElements) {
    see_more.push(await t.evaluate(x => {
      x.click();
    }));
  }
}

await clickSeeMore();
  // -------------------------


  await page.waitForTimeout(2 * 1000);

  RANDOM_CLICK3 = ('.x1n2onr6.x1ja2u2z.x78zum5.x2lah0s.xl56j7k.x6s0dn4.xozqiw3.x1q0g3np.xi112ho.x17zwfj4.x585lrc.x1403ito.x972fbf.xcfux6l.x1qhh985.xm0m39n.x9f619.xbxaen2.x1u72gb5.xtvsq51.x1r1pt67');

  // console.log(RANDOM_CLICK3);
  if (RANDOM_CLICK3.innerText != null) {
    await page.click(RANDOM_CLICK3);
    await page.waitForTimeout(2 * 1000);
  }

  


  async function fetchPublicPost(){

  const classSelector = ".x1cy8zhl.x78zum5.x1q0g3np.xod5an3.x1pi30zi.x1swvt13.xz9dl7a";


  function pretifyJSON(inputString){

    function trimReaction(inputString){
    const trimPhrases = ['All reactions:', 'LikeShare', 'Like\nShare'];

    let trimmedString = inputString;
    
    for (const trimPhrase of trimPhrases) {
      const trimIndex = inputString.indexOf(trimPhrase);
      if (trimIndex !== -1) {
        trimmedString = inputString.substring(0, trimIndex);
        break;
      }
    }
    
    return trimmedString;
  }

  let reactionRemoveString = trimReaction(inputString);

  function makeJSONObject(str){
  
  // Regular expression pattern
  const regex = /(\d{1,2}\s\w+\s(?:at\s\d{2}:\d{2})?)/;

  // Extract the date from the text using match()
  const match = str.match(regex);

  // Extracted date
  const date = match ? match[0] : null;
  const formattedDate = date ? date.replace(/\n$/, '').trim() : null;


// Regular expression pattern
const regex3 = /^(.*?)\s*(?:\d{1,2}\s\w+\s(?:at\s\d{2}:\d{2})?|$)/;

// Extract the date from the string
const match2 = str.match(regex3);
const name = match2 ? match2[1].trim().replace(/\u00A0 ·$/, '') : null;

// Extract content from the string
const contentRegex = /^[\s·]+/;
const content = str.split(date)[1].replace(contentRegex, '').replace("Shared with Public", "Shared with Public ").trim();


  const result = {
  'name': name,
  'postDate|timeSincePosted': formattedDate,
  'content': content
  };

  return result;

  }

  return makeJSONObject(reactionRemoveString);

}


  const elems = await page.$$(classSelector);

  const posts = {};

  for (let i = 0; i < elems.length; i++) {
    const elem = elems[i];
    const textContent = await elem.evaluate(el => {
     return el.parentNode.parentNode.innerText;

    });

    // pretifyJSON(textContent);
    
    posts[`publicPost${i}`] = pretifyJSON(textContent);
  }

  return posts;

  }

  const posts = await fetchPublicPost();


  function saveAsJSON(object, filename){
  // Convert the data to JSON string
    const jsonData = JSON.stringify(object, null, 2);
  
  // Specify the file path where you want to save the JSON data
   const filePath = filename;

  // Save the JSON data to the file
  fs.writeFileSync(filePath, jsonData);

  console.log('Data saved to JSON file:', filePath);

  browser.close();

}

  saveAsJSON(posts, 'publicPosts.json');



}


run()
