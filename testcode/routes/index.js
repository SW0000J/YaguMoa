var express = require('express');
var router = express.Router();

const getXports = require('../test1.js');
const getZum = require('../test2.js');
const getChosun = require('../test3.js');
const getYna = require('../test4.js')

let xports;
let zum;
let chosun;
let yna;
(async function() {
try {
    xports = await getXports();
    zum = await getZum();
    chosun = await getChosun();
    yna = await getYna();
    console.log(xports);
    console.log(zum);
    console.log(chosun);
    console.log(yna);
} catch (e) {
	return console.log(e);
}
})();

router.get('/', function(req, res, next){
    
    res.render('index', {
        xports : xports,
        zum : zum,
        chosun : chosun,
        yna : yna
    });
});

console.log("started\n");
module.exports = router;
