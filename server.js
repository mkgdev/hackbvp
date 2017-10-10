var express = require('express');
var app     = express();
var session = require('express-session');
var indexRoute = require('./route/index.js');
// var watson = require('watson-developer-cloud');
var fs = require('fs');
var bodyParser = require('body-parser');
// var visual_recognition = watson.visual_recognition({
//   api_key: '36fe4dec42a5b39493c0768911d6550553843427',
//   version: 'v3',
//   version_date: '2016-05-20'
// });


app.set('view engine','ejs');
app.use(express.static(__dirname+'/public'));

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}));
app.use(bodyParser.urlencoded({ extended: true, limit: '5mb' }));
// app.use(bodyParser.json({limit: '5mb'}));




//**************************
//     Routes config
///*************************

 app.use(indexRoute);

//**************************

//**********************************
//         IBM WATSON
//***************************
// var ans=[];
//
// var params = {
// url:"https://img.tradeindia.com/fp/0/209/empty-plastic-bottles-561.jpg"
// };
//
// visual_recognition.classify(params, function(err, res) {
//   if (err)
//     console.log(err);
//   else
//   {
//     var apiData = res;
//     console.log(JSON.stringify(res, null, 2));
//     apiData.images[0].classifiers[0].classes.forEach(function(data)
//   {
//    ans.push(data.class.split(" "));
//
// }
//   );
//   printAns();
//
//   }
// });
//
// function printAns()
// {
//   console.log(ans);
// }
//

// *****************************





app.listen('8080', function()
{


console.log('Server on running on 8080 port');

}




);
