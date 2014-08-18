//var util = require('util');
var fs = require('fs');

var im = require('imagemagick');


exports.uploadImg = function(req, res){
    console.log('file info: ',req.files.image);
   // console.log('file info: ',req.files.image);

    fs.readFile(req.files.image.path, function (err, data) {

        var imageName = req.files.image.name;
        var imagePath = req.files.image.path;
        var imageType = req.files.image.type;
        console.log("tyyp " + imageType.match(/(jpg|jpeg|png)$/i))
        /// If there's an error
        if(!imageName || imageType.match(/(jpg|jpeg|png)$/i)===null){

            console.log("There was an error")
            res.redirect("/");
            res.end("There was an error");

        } else {

           // var newPath = __dirname +"/../../public/uploads/fullsize/" + imageName;
            var thumbPath = __dirname +"/../../public/avatar/" + req.user.username+".jpg";

            /// write file to uploads/fullsize folder
            fs.writeFile(imagePath, data, function (err) {

                /// write file to uploads/thumbs folder
                im.crop({
                    srcPath: imagePath,
                    dstPath: thumbPath,
                    width:   400,
                    height : "400^"

                }, function(err, stdout, stderr){
                    if (err) throw err;
                    console.log('resized image to fit within 200x200px');
                });

                res.send("/avatar/" + req.user.username+".jpg");



            });
        }
    });

/*
    var pathArray = req.files.image.path.split( '/' );

    res.send(util.format(' Task Complete \n uploaded %s (%d Kb) to %s as %s'
        , req.files.image.name
        , req.files.image.size / 1024 | 0
        , req.files.image.path
        , req.body.title
        , req.files.image
        , '<img src="uploads/' + pathArray[(pathArray.length - 1)] + '">'
    ));
    */



};