var express = require('express');
var router = express.Router();

const getXports = require('../test1.js');
const Zum = require('../test2.js');
const Chosun = require('../test3.js');
const zum = Zum.zum;
const chosun = Chosun.chosun;

let xports;
(async function() {
try {
	xports = await getXports();
	console.log(xports);
} catch (e) {
	return console.log(e);
}
})();

router.get('/', function(req, res, next){
    
    res.render('index', {
        xports : xports,
        zum : zum,
        chosun : chosun,
 //       yna : yna
    });
});

console.log("aaaa\n");
for(var i in xports){
	console.log("aaaa\n");
    console.log(i.datetime);
}
module.exports = router;
