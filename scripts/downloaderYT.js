const Nightmare = require('nightmare');
const cheerio = require('cheerio');
const open = require('open');

const downloadUrl = 'https://www.y2mate.com/youtube-mp3';
// const YTlink =
//   'https://www.youtube.com/watch?v=BRuHGchMrD8&list=RDEMWzsBFrM1G6O0x93sFkgUtg&start_radio=1&rv=uhZ92NKtsoM&ab_channel=LosEnanitosVerdes-Topic';

const _linksYT = [];

function downloaderYT() {
  Nightmare({show: false})
    .goto(YTlink)
    .wait('body')
    .wait('a#wc-endpoint')
    .evaluate(() => document.querySelector('body').innerHTML)
    .end()
    .then(response => {
      console.warn('init YT! ---------------------------------');
      getLinksYT(response);
    })
    .catch(err => {
      console.log(err);
    });
}

async function getLinksYT(YTlink) {
  const response = await Nightmare({show: false})
    .goto(YTlink)
    .wait('body')
    .wait('a#wc-endpoint')
    .evaluate(() => document.querySelector('body').innerHTML)
    .end();
  // .then(response => {
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
  // })
  // .catch(err => {
  //   console.log(err);
  //   return [];
  // });
  // return resp;
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
        const link = $(a).attr('href');
        // console.log(link);
        await open(link);
        // linksDownload.push(link);
      })
      .catch(err => {
        console.log(err);
      });
  });
  // fs.writeFile('./links.json', JSON.stringify(linksDownload), 'utf8', function (error) {
  //   if (error) return console.log('error', error);
  //   console.log(linksDownload.length, 'items saved');
  // });
  // return linksDownload;
}
// https://video-to-mp3-converter.com/es9
module.exports = {getLinksYT};
