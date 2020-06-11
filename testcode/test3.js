const axios = require("axios");
const cheerio = require("cheerio");

const url = "http://news.chosun.com/svc/list_in/list.html?catid=82"

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
    const $bodyList = $("div.list_body > div.list_content").children("dl.list_item");

    $bodyList.each(function(i, elem) {
      ulList[i] = {
        url: $(this).find('dd.thumb > a').attr('href'),
        image_url: $(this).find('dd.thumb a > img').attr('src'),
        title: $(this).find('dt > a').text(),
        summary: $(this).find('dd.desc').text(),//.slice(1, -2),
        datetime: $(this).find('dd.date_author > span.date').text()
      };
      //console.log(ulList[i])  // list object checking code
    });

    const data = ulList.filter(n => n.title);
    return data;
    //return ulList;
  }).then(res => console.log(res));