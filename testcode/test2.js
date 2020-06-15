const axios = require("axios");
const cheerio = require("cheerio");

const url = "https://news.zum.com/issuelist/58654445"

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
    const $bodyList = $("div.major_news > ul").children("ul.no_reply > li.large");

    $bodyList.each(function(i, elem) {
      ulList[i] = {
        url: 'news.zum.com' + $(this).find('div.img > a').attr('href'),
        image_url: $(this).find('div.img > a > img').attr('src'),
        title: $(this).find('div.txt > div.title > a').text(),
        summary: $(this).find('div.txt > div.content > a').text(),//.slice(0, -29)
        datetime: $(this).find('div.txt > div.content > span.etc').text()
      };
      //console.log(ulList[i])  // list object checking code
    });

    const data = ulList.filter(n => n.title);
    return data;
    //return ulList;
  });
