var express = require('express');
var router = express.Router();

const getXports = require('../crawling/xports.js');
const getZum = require('../crawling/zum.js');
const getChosun = require('../crawling/chosun.js');
const getYna = require('../crawling/yna.js');
const getIsplus1 = require('../crawling/isplus1.js');
const getIsplus2 = require('../crawling/isplus2.js');
const getIsplus3 = require('../crawling/isplus3.js');
const getIsplus4 = require('../crawling/isplus4.js');

let isplus1;
let isplus2;
let isplus3;
let isplus4;
let xports;
let zum;
let chosun;
let yna;
let newslist;
let lg = new Array();
const loadlist = async function() {
try {
    newlist = []
    isplus1 = await getIsplus1();
    isplus2 = await getIsplus2();
    isplus3 = await getIsplus3();
    isplus4 = await getIsplus4();
    xports = await getXports();
    zum = await getZum();
    chosun = await getChosun();
    yna = await getYna();

    newslist = isplus1.concat(isplus2, isplus3, isplus4, xports, zum, chosun, yna);
    let searchlist = ['LG', 'lg', '엘지', '트윈스', '라모스', '류중일'];
    lg = []
    for(var i of newslist){
        for (var j of searchlist){
            if(i.title.indexOf(j) !== -1 || i.summary.indexOf(j) !== -1){
                lg.push(i);
                break;
            }
        }
    }
    console.log("lg loaded");

} catch (e) {
	return console.log(e);
}
};
loadlist();

router.get('/', function(req, res, next){
    loadlist();
    res.render('lg', {
        lg : lg
    });
});

module.exports = router;
