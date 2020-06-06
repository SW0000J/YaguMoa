const axios = require("axios");
const cheerio = require("cheerio");

const url = "https://www.yna.co.kr/sports/baseball"

const getHtml = async () => {
  try {
    return await axios.get(url);
  } catch (error) {
    console.error(error);
  }
};

getHtml()
  .then(html => {
    let ulList = [];
    const $ = cheerio.load(html.data);
    const $bodyList = $("div.list-type038 ul.list li").children("div.item-box01");

    $bodyList.each(function(i, elem) {
      ulList[i] = {
        datetime: $(this).find('span.txt-time').text(),
        image_url: $(this).find('figure.img-con a').attr('href'),
        url: $(this).find('div.news-con a').attr('href'),
        title: $(this).find('div.news-con strong').text(),
        summary: $(this).find('div.news-con p').text()
      };
      //console.log(ulList[i])  // list object checking code
    });

    const data = ulList.filter(n => n.title);
    return data;
    //return ulList;
  }).then(res => console.log(res));