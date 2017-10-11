var router = require('express').Router();
var watson = require('watson-developer-cloud');
var visual_recognition = watson.visual_recognition({
  api_key: '36fe4dec42a5b39493c0768911d6550553843427',
  version: 'v3',
  version_date: '2016-05-20'
});
var result="Biodegradable";
var nonBio = ['bottle','plastic','flask','thermal','bags', 'bag', 'water bottle', 'mobile', 'mobiles','wire','metal','faceplate','electronic','electronics','curtains','wall','car','charger','glass','laptop',
                 'vehicle','chair','table','wires'];

router.get('/',function(req,res)
{

 res.render('index');


});

router.post('/',function(req, res)
{

  var body = req.body.imgdata;
  console.log(body);
  base64Data = body.replace(/^data:image\/png;base64,/,""),
  binaryData = new Buffer(base64Data, 'base64').toString('binary');

  require("fs").writeFile("public/assets/out.png", binaryData, "binary", function(err) {
  if(err){
    console.log(err);
  }
  else{
    var ans=[];
    

    var params = {
      images_file: require('fs').createReadStream('public/assets/out.png')

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
      console.log(result);
      }
    });
    
    function checkAns()
    {
      console.log(ans);
      ans.forEach(function(element)
{
element.forEach(function(ele)
{
  if(nonBio.includes(ele))
  {
    result="Non-Biodegradable";

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
router.get('/data',function(req,res)
{
  res.send(result);
});
router.get('/options', function(req,res)
{

res.render('buttons');

}
);

router.post('/urldata', function(req,res)
{

var data = req.body.inputdata;

var ans=[];



var params = {
  url:data

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
  console.log(result);
  }
});

function checkAns()
{
  console.log(ans);
  ans.forEach(function(element)
{
element.forEach(function(ele)
{
if(nonBio.includes(ele))
{
result="Non-Biodegradable";

}
}

);


}

);
}



}

);

router.post('/pathdata', function(req,res)
{

var data = req.body;
console.log(data);

}
);

// router.get('/searchtoilet',function(req,res)
// {
//
//  res.render('index');
//
//
// });
//
// router.get('/query',function(req,res)
// {
//
//  res.render('index');
//
//
// });

router.get('/objectdetect',function(req,res)
{


  res.render('checktype');
}

);
router.get('/show',function(req,res)
{

res.render('show',{result:result});
}
          
);

router.get('/locator',function(req,res)
{
res.render('map');
}
          
);

router.get('/contact',function(req,res){
          res.render('contact');
          
});
module.exports = router;
