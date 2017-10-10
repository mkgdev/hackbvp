var router = require('express').Router();
var watson = require('watson-developer-cloud');
var visual_recognition = watson.visual_recognition({
  api_key: '36fe4dec42a5b39493c0768911d6550553843427',
  version: 'v3',
  version_date: '2016-05-20'
});


router.get('/',function(req,res)
{

 res.render('index');


});

router.post('/',function(req, res)
{

  var body = req.body.imgdata;
  base64Data = body.replace(/^data:image\/png;base64,/,""),
  binaryData = new Buffer(base64Data, 'base64').toString('binary');

  require("fs").writeFile("out.png", binaryData, "binary", function(err) {
  if(err){
    console.log("Error occurred");
  }
  else{
    var ans=[];
    var nonBio = ['bottle','plastic','flask','thermal','bags', 'bag', 'water bottle', 'mobile', 'mobiles'];

    var params = {
      images_file: require('fs').createReadStream('out.png')

    };

    visual_recognition.classify(params, function(err, res) {
      if (err)
        console.log(err);
      else
      {
        var apiData = res;
        console.log(JSON.stringify(res, null, 2));
        apiData.images[0].classifiers[0].classes.forEach(function(data)
      {
       ans.push(data.class.split(" "));

    }
      );
      checkAns();

      }
    });
    var test =['black','coal'];
    function checkAns()
    {
      console.log(ans);
      ans.forEach(function(element)
{
element.forEach(function(ele)
{
  if(test.includes(ele))
  {
    console.log('milgya');
  }
}

);

}

    );
    }


  }// writes out file without error, but it's not a valid image
  });

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
