var express = require('express'); // web server 사용
var fs = require('fs'); // file load

var app = express();
var port = 80;

app.listen(port, function(){
  console.log('Server Start');
})

app.get('/', function(req, res){
  fs.readFile('WebTest.html', function(error, data){
    if(error){
      console.log(error);
    }else{
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.end(data);
    }
  })
})