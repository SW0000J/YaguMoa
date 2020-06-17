const axios = require("axios"); // 웹 서버 요청 모듈
const cheerio = require("cheerio"); // Load한 것을 jQuery처럼 사용

const url = "http://isplus.live.joins.com/news/list/list.asp?page=1"

const getHtml = async () => {
    try {
        return await axios.get(url);
    } catch (error) {
        console.error(error);
    }
};


const getIsplus1 = async () => {

	return new Promise((resolve, reject) => {
	getHtml()
	  .then(html => {
		let ulList = [];
		//console.log(html.data);
		const $ = cheerio.load(html.data);
        const $bodyList = $("div.news_list > div.bd > ul").children("li");
 
        $bodyList.each(function(i, elem) {
        ulList[i] = {
            url: $(this).find('dl > dd.photo > a').attr('href'),
            image_url: $(this).find('dl > dd.photo > a > img').attr('src'),
            title: $(this).find('dl > dt > a').text(),
            summary: $(this).find('dl > dd > a').text(),
            datetime: $(this).find('dl > dd > span.date').text() + " " + $(this).find('dl > dd > span.time').text()
        };
		  //console.log(ulList[i])  // list object checking code
		});

		const data = ulList.filter(n => n.title);
		return data;
		//return ulList;
	  }).then(data => {
		  resolve(data);
	  });
});
};

module.exports = getIsplus1;
