var express = require('express');
var app     = express();
var session = require('express-session');
var indexRoute = require('./route/index.js');

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}));


//**************************
//     Routes config
///*************************

 app.use(indexRoute);

//**************************


app.listen('8080', function()
{


console.log('Server on running on 8080 port');

}




);
