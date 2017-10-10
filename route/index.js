var router = require('express').Router();


router.get('/',function(req,res)
{

 res.render('index');


});

router.post('/',function(req, res)
{

  var body = req.body.data;
  base64Data = body.replace(/^data:image\/png;base64,/,""),
  binaryData = new Buffer(base64Data, 'base64').toString('binary');

  require("fs").writeFile("out.png", binaryData, "binary", function(err) {
    console.log(err); // writes out file without error, but it's not a valid image
  });
  console.log(body);
}
);
router.get('/checktype',function(req,res)
{

 res.render('index');


});

router.get('/searchtoilet',function(req,res)
{

 res.render('index');


});

router.get('/query',function(req,res)
{

 res.render('index');


});

router.get('/objectdetect',function(req,res)
{


  res.render('checktype');
}

);




module.exports = router;
