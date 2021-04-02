const cheerio = require('cheerio');
const axios = require('axios');
const fs = require('fs-extra');

const baseUrl = 'https://apuestas.wplay.co';

const getMatchesByDate = (date, sport) => {
  return axios
    .get(`${baseUrl}/es/calendar?date=${date}&sport_code=${sport}`)
    .then((response) => {
      const $ = cheerio.load(response.data);
      console.log($);
      const items = $('.time-group')
        .toArray()
        .map((item) => {
          const $item = $(item);
          return {
            league: $item
              .find('.expander-button')
              .text()
              .replace('\n', '')
              .replace('\n', ''),
            mkts: $item
              .find('.mkt.mkt_content')
              .toArray()
              .map((mkt) => {
                const $mkt = $(mkt);
                return {
                  date: $mkt.find('.date').text(),
                  time: $mkt.find('.time').text(),
                  link: $mkt.find('.mkt-count a').attr('href'),
                };
              }),
          };
        });
      return items;
    });
};

const getMarkets = () => {
  return axios.get(baseUrl + '/es').then((response) => {
    const $ = cheerio.load(response.data);
    const items = $('.coupon-for-type')
      .toArray()
      .map((item) => {
        const $item = $(item);
        return {
          league: $item
            .find('.expander-button')
            .text()
            .replace('\n', '')
            .replace('\n', ''),
          mkts: $item
            .find('.mkt.mkt_content')
            .toArray()
            .map((mkt) => {
              const $mkt = $(mkt);
              return {
                date: $mkt.find('.date').text(),
                time: $mkt.find('.time').text(),
                link: $mkt.find('.mkt-count a').attr('href'),
              };
            }),
        };
      });
    return items;
  });
};

const getOdds = ($) => {
  return $('.expander-MSDBLC')
    .siblings('div.expander-content')
    .find('.limited-row')
    .toArray()
    .map((row) => {
      const $row = $(row);
      return {
        name: $row.find('.seln-name').text(),
        odd: $row.find('.price.dec').text(),
      };
    });
};

function padre() {
  let arr = [];
  return function closure(m) {
    return axios
      .get(baseUrl + m.link)
      .then((response) => {
        const $ = cheerio.load(response.data);
        const title = $('.expander-MSDBLC .mkt-name').text();
        const li = getOdds($);

        const match = {
          ...m,
          title,
          local: m.link.split('-v-')[0].split('/').pop(),
          visit: m.link.split('-v-')[1],
          odds: li,
        };
        return match;
      })
      .catch((err) => {});
  };
}

function getAllMarkets(arr) {
  return getMarkets()
    .then((leagues) =>
      leagues.filter((l) => {
        return arr.includes(l.league);
      })
    )
    .then((l) => {
      return l.reduce((acc, leg) => {
        const map = leg.mkts.map((mkt) => {
          return {
            ...mkt,
            league: leg.league,
          };
        });
        acc.push(map);
        return acc;
      }, []);
    })
    .then((x) => {
      const getMatches = padre();

      const matches = x.flat().map((match) => {
        return getMatches(match);
      });
      return Promise.all(matches).then((res) => {
        const items = res.filter((m) => m);
        console.log('finish!', res);
        // fs.writeJSON('./data/items.json', JSON.stringify(items));
        return items;
      });
    });
}

const date = new Date().toString().split('T')[0];
// getMatchesByDate(date, 'FOOT');
getMarkets();
// export { getAllMarkets, getMarkets, getMatchesByDate };
