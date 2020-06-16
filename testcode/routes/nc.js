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
let nc = new Array();
(async function() {
try {
    xports = await getXports();
    zum = await getZum();
    chosun = await getChosun();
    yna = await getYna();
    
    newslist = xports.concat(zum, chosun, yna);
    for(var i of newslist){
        if(i.title.indexOf('NC') !== -1 || i.title.indexOf('nc') !== -1 || i.title.indexOf('엔씨') !== -1 || i.summary.indexOf('NC') !== -1 || i.summary.indexOf('nc') !== -1 || i.summary.indexOf('엔씨') !== -1){
            nc.push(i);
        }
    }
    console.log("nc loaded");

} catch (e) {
	return console.log(e);
}
})();

router.get('/', function(req, res, next){
    
    res.render('nc', {
        nc : nc
    });
});

module.exports = router;
