var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var request = require('request');
var fs = require('fs');
var ejs = require('ejs');
var indexRouter = require('./routes/index');

var app = express();
const PORT = 80;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', indexRouter);

app.listen(PORT, function(){
    console.log('Code run in https://localhost:'+PORT);
});








/*
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');
const ejs = require('ejs');
var engines = require('consolidate');
const PORT = 80;

// 크롤링 한 list 받아오기
const xports = require('./test1.js');
const zum = require('./test2.js');
const chosun = require('./test3.js');
const yna = require('./test4.js');

//console.log(xports.xports);
//console.log(zum.zum);
//console.log(chosun.chosun);
//console.log(yna.yna);

// router 설정
var indexRouter = require('./routes/index');

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(express.static('public'))

app.set('news', __dirname + '/news');
//화면 engine 설정
app.engine('html', engines.mustache);
app.set('news engine', 'ejs');

// main 화면
app.use('/', indexRouter);

// 서버 생성
app.listen(PORT, function(){
    console.log('Code run in https://localhost:'+PORT);
});
*/
