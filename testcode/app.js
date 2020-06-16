var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var request = require('request');
var fs = require('fs');
var ejs = require('ejs');
var indexRouter = require('./routes/index');
var ncRouter = require('./routes/nc');

var app = express();
const PORT = 80;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/nc', ncRouter);

app.listen(PORT, function(){
    console.log('Code run in https://localhost:'+PORT+'\n');
});
