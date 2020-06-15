var express = require('express');
var router = express.Router();

const Xports = require('../test1.js');
const Zum = require('../test2.js');
const Chosun = require('../test3.js');
const Yna = require('../test4.js');
const xports = Xports.xports;
const zum = Zum.zum;
const chosun = Chosun.chosun;
const yna = Yna.yna;

router.get('/', function(req, res, next){
    
    res.render('index', {
        xports : xports,
        zum : zum,
        chosun : chosun,
        yna : yna
    });
});

for(var i in xports){
    console.log(i.datetime);
}
module.exports = router;