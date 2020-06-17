var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var indexRouter = require('./routes/index');
var ncRouter = require('./routes/nc');
var lgRouter = require('./routes/lg');
var doosanRouter = require('./routes/doosan');
var kiwoomRouter = require('./routes/kiwoom');
var kiaRouter = require('./routes/kia');
var lotteRouter = require('./routes/lotte');
var samsungRouter = require('./routes/samsung');
var ktRouter = require('./routes/kt');
var skRouter = require('./routes/sk');
var hanwhaRouter = require('./routes/hanwha');

//var request = require('request');
//var fs = require('fs');
//var ejs = require('ejs');

var app = express();
const PORT = 80;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/nc', ncRouter);
app.use('/lg', lgRouter);
app.use('/doosan', doosanRouter);
app.use('/kiwoom', kiwoomRouter);
app.use('/kia', kiaRouter);
app.use('/lotte', lotteRouter);
app.use('/samsung', samsungRouter);
app.use('/kt', ktRouter);
app.use('/sk', skRouter);
app.use('/hanwha', hanwhaRouter);

app.listen(PORT, function(){
    console.log('Code run in https://localhost:'+PORT+'\n');
});
