const axios = require("axios"); // 웹 서버 요청 모듈
const cheerio = require("cheerio"); // Load한 것을 jQuery처럼 사용
//const Iconv = require('iconv').Iconv; // 한글 깨짐 방지
//const iconv = new Iconv('EUC-KR', 'UTF-8//IGNORE');

const url = "http://www.xportsnews.com/?ac=article_list&cate_indexno=12"

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
    //console.log(html.data);
    const $ = cheerio.load(html.data);
    const $bodyList = $("ul.list_news > li");//.children("");

    $bodyList.each(function(i, elem) {
      ulList[i] = {
        url: 'xportsnews.com' + $(this).find('div.thumb > a').attr('href'),
        image_url: $(this).find('div.thumb > a > img').attr('src'),
        title: $(this).find('dl.dlist > dt > a').text(),
        summary: $(this).find('dd').text().slice(1, -2),
        datetime: $(this).find('dd > span.data').text()
      };
      //console.log(ulList[i])  // list object checking code
    });

    const data = ulList.filter(n => n.title);
    return data;
    //return ulList;
  }).then(res => console.log(res));