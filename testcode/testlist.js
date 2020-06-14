var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');
const PORT = 80;

const xports = require('./test1.js');
const zum = require('./test2.js');
const chosun = require('./test3.js');
const yna = require('./test4.js');

//console.log(xports.xports);
//console.log(zum.zum);
//console.log(chosun.chosun);
//console.log(yna.yna);

app.get('/', function(req, res){
    
    var newslist = '';
    var newsobject = xports.xports;
    console.log(newsobject[0].url);
    for(var i = 0; i < newsobject.length; i++){
        newslist = newslist +`
        <li>
            <div class='item'>
                <div class='info'>
                    <span class='time'>${newsobject[i].datetime}</span>
                </div>
                <div class='img'>
                    <a>
                        <img src = ${newsobject[i].image_url}>
                    </a>
                    </div>
                <div class='news'>
                    <a href = ${newsobject[i].url}>
                        <strong>${newsobject[i].title}</strong>
                    </a>
                    <p>
                        ${newsobject[i].summary}
                    </p>
                </div>
            </div>
        </li>`;
    }

    var html = `
    <!DOCTYPE html>
    <html>

        <head>
            <meta charset="utf-8">
            <title>ossswoo.tk</title>
        </head>

        <body>
            <div class = 'main'>
                <div class = 'center'>
                    <div>
                        ${newslist}
                    </div>
                </div>
            </div>
        </body>
    </html>`;
    res.send(html);
});

app.listen(PORT, function(){
    console.log('Code run in https://localhost:'+PORT);
});