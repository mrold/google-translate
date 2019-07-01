const puppeteer = require('puppeteer');
const express = require('express');

const urls = {
    "cn": 'https://translate.google.cn/#view=home&op=translate&sl=en&tl=zh-CN',
    'en': 'https://translate.google.cn/#view=home&op=translate&sl=zh-CN&tl=en'
};

let browser;

const launch = async () => {
    browser = await puppeteer.launch();
};

const translate = async (lang, text, cb) => {
    const page =  await browser.newPage();
    await page.goto(urls[lang]);
    await page.keyboard.type(text);

    await page.on('response', async response => {
        const url = response.url();
        if (url.search("https://translate.google.cn/translate_a/single?") >= 0) {
            let result = await response.json();

            let dest = [];
            result[0].forEach(function (item, i) {
                dest.push(item[0])
            });
            console.log(dest.join(''));
            cb(dest.join(''));
        }
    });
};


const app = express();

app.get('/', async (req, res) => {

    const text =  req.query.text || 'hello world';
    const to = req.query.to || 'cn';

    console.log(text);
    console.log(to);
    await translate(to, text, function (dest) {
        res.send(dest)
    });

});

launch();

app.listen(3000, () => console.log('Example app listening on port 3000!'));