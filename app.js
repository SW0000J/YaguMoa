const axios = require("axios");
const cheerio = require("cheerio");
const log = console.log;

const getHtml = async () => {
  try {
    return await axios.get("https://www.yna.co.kr/sports/baseball");
  } catch (error) {
    console.error(error);
  }
};

getHtml()
  .then(html => {
    let ulList = [];
    const $ = cheerio.load(html.data);
    const $bodyList = $("ul.list li").children("div.item-box01");

    $bodyList.each(function(i, elem) {
      ulList[i] = {
        datetime: $(this).find('span.txt-time').text(),
        image_url: $(this).find('figure.img-con a').attr('href'),
        url: $(this).find('div.news-con a').attr('href'),
        title: $(this).find('div.news-con strong').text(),
        summary: $(this).find('div.news-con p').text().slice(0, -29)
      };
      //console.log(ulList[i])  // list object checking code
    });

    const data = ulList.filter(n => n.title);
    return data;
    //return ulList;
  }).then(res => console.log(res));