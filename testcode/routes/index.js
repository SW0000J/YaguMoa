var express = require('express');
var router = express.Router();

const getXports = require('../xports.js');
const getZum = require('../zum.js');
const getChosun = require('../chosun.js');
const getYna = require('../yna.js')

let xports;
let zum;
let chosun;
let yna;
let newslist;
(async function() {
try {
    xports = await getXports();
    zum = await getZum();
    chosun = await getChosun();
    yna = await getYna();

    newslist = xports.concat(zum, chosun, yna);
    console.log("index loaded");

} catch (e) {
	return console.log(e);
}
})();

router.get('/', function(req, res, next){
    
    res.render('index', {
        newslist : newslist
    });
});

module.exports = router;
