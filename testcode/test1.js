const axios = require("axios"); // 웹 서버 요청 모듈
const cheerio = require("cheerio"); // load한 것을 jQuery처럼 사용
const Iconv = require('iconv').Iconv; // 한글 깨짐 방지
const iconv = new Iconv('CP949', 'utf-8//translit//ignore');

const url = "https://sports.news.nate.com/baseball/"

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
    
    const $ = cheerio.load(iconv.convert(html.data).toString()); //iconv.decode(cheerio.load(html.data), "EUC-KR").toString(); encoding이 EUC-KR로 되어있음
    const $bodyList = $("div.hotIssueCluster.timeline>div.cluster_box").children("div.cluster_basic");

    $bodyList.each(function(i, elem) {
      ulList[i] = {
        datetime: $(this).find('div.cluster_basic>div.mduCluster>div.mduWrap>div.mduBasic>a>span.origin em.date').text(),
        url: $(this).find('div.cluster_basic > div.mduCluster > div.mduWrap > div.mduBasic > a').attr('href'),
        image_url: $(this).find('div.cluster_basic > div.mduCluster > div.mduWrap > div.mduBasic > a > span.mduimgArea > img').attr('src'),
        title: $(this).find('div.cluster_basic > div.mduCluster > div.mduWrap > div.mduBasic > a > span.tit').text(),
        summary: $(this).find('div.cluster_basic > div.mduCluster > div.mduWrap > div.mduBasic > a > span.text').text()//.slice(0, -29)
      };
      //console.log(ulList[i])  // list object checking code
    });

    const data = ulList;
    return data;
    //return ulList;
  }).then(res => console.log(res));