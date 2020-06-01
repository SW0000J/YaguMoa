const axios = require("axios");
const cheerio = require("cheerio");
const log = console.log;

const getHtml = async () => {
  try {
    return await axios.get("https://sports.news.naver.com/kbaseball/news/index.nhn?isphoto=N&type=latest");
  } catch (error) {
    console.error(error);
  }
};

getHtml()
  .then(html => {
    let ulList = [];
    const $ = cheerio.load(html.data);
    const $bodyList = $("div.news_list ul").children("li");

    $bodyList.each(function(i, elem) {
      ulList[i] = {
        url: $(this).find('a').attr('href'),
        image_url: $(this).find('a.thmb img').attr('src'),
        title: $(this).find('div.text a').text(),
        summary: $(this).find('div.text p').text(),//.slice(0, -29)
        datetime: $(this).find('div.text div.source span').text()
      };
      console.log(ulList[i])  // list object checking code
    });

    const data = ulList.filter(n => n.title);
    return data;
    //return ulList;
  }).then(res => console.log(res));