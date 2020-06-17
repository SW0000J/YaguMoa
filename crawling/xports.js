const axios = require("axios"); // 웹 서버 요청 모듈
const cheerio = require("cheerio"); // Load한 것을 jQuery처럼 사용

const url = "http://www.xportsnews.com/?ac=article_list&cate_indexno=12"

const getHtml = async () => {
  try {
    return await axios.get(url);
  } catch (error) {
    console.error(error);
  }
};


const getXports = async () => {

	return new Promise((resolve, reject) => {
	getHtml()
	  .then(html => {
		let ulList = [];
		//console.log(html.data);
		const $ = cheerio.load(html.data);
		const $bodyList = $("ul.list_news > li");//.children("");

		$bodyList.each(function(i, elem) {
		  ulList[i] = {
			url: 'http://www.xportsnews.com' + $(this).find('div.thumb > a').attr('href'),
			image_url: $(this).find('div.thumb > a > img').attr('src'),
			title: $(this).find('dl.dlist > dt > a').text(),
			summary: $(this).find('dd').text(),
			datetime: $(this).find('dd > span.data').text()
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

module.exports = getXports;
