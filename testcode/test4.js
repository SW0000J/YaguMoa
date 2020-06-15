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


const getXports = async () => {

	return new Promise((resolve, reject) => {
	getHtml()
	  .then(html => {
		let ulList = [];
    //console.log(html.data);
    const $ = cheerio.load(html.data);
    const $bodyList = $("div.list-type038 ul.list li").children("div.item-box01");

    $bodyList.each(function(i, elem) {
      ulList[i] = {
        datetime: $(this).find('span.txt-time').text(),
        image_url: $(this).find('figure.img-con a img').attr('src'),
        url: $(this).find('div.news-con a').attr('href'),
        title: $(this).find('div.news-con strong').text(),
        summary: $(this).find('div.news-con p').text()
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
