var express = require('express');
var app = express();
app.get(' /user/edit-profile', function name(req, res) {

    res.send('<html><head></head><body><h1>dddd</h1></body></html>');

}); //index

//監聽 port

var port = process.env.PORT || 3000;
app.listen(port);