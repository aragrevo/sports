const Nightmare = require('nightmare');
const cheerio = require('cheerio');
const open = require('open');

const downloadUrl = 'https://www.y2mate.com/youtube-mp3';

async function getLinksYT(YTlink) {
  const _linksYT = [];
  const response = await Nightmare({show: false})
    .goto(YTlink)
    .wait('body')
    .wait('a#wc-endpoint')
    .evaluate(() => document.querySelector('body').innerHTML)
    .end();
  console.warn('init YT! ---------------------------------');
  const $ = cheerio.load(response);
  const links = $('#wc-endpoint')
    .each((i, el) => {
      const link = $(el).attr('href');
      _linksYT.push(link);
    })
    .toArray();
  const all = [...new Set(_linksYT)];
  console.warn('finish YT! ---------------------------------' + all.length);
  return all;
}

function getLinksDownload(links) {
  console.log('to download: ', links.length);
  links.forEach((link, i) => {
    console.info('download! - ' + i);
    Nightmare({show: false})
      .goto(`${downloadUrl}`)
      .wait('body')
      .wait('input#txt-url')
      .type('input#txt-url', `https://www.youtube.com${link}`)
      .click('button#btn-submit')
      .wait('button#process_mp3')
      .click('button#process_mp3')
      .wait('div.modal.fade.in')
      .wait('div#process-result > div')
      .evaluate(() => document.querySelector('#process-result').innerHTML)
      .end()
      .then(async response => {
        const $ = cheerio.load(response);
        const a = $('.btn-file');
        const _link = $(a).attr('href');
        await open(_link);
      })
      .catch(err => {
        console.log(err);
      });
  });
}

module.exports = {getLinksYT, getLinksDownload};
