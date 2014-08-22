var Ratings = require('mongoose').model('Rating');
var Takings = require('mongoose').model('Taking');

exports.getRatings = function(req, res) {
    console.log('user siin: ' + req.user),
    Ratings.find(req.query).exec(function(err, collection) {
        res.send(collection);

    })
};
exports.addComment = function(req, res){
    var ratingData = req.body;
    console.log(ratingData);

    Ratings.create(ratingData, function(err, taking) {
        if(err) {
        }
        console.log(taking)

        res.send(taking);
    })
};

exports.userRated=function(req, res) {
var takingsCount, ratingsCount;
    var ratingData = req.body;
    Ratings.count({username: ratingData.username,ratedUsername:ratingData.ratedUsername},function(err, count) {
        console.log('ratings'+ count);
        //res.send({reason:collection});
        takingsCount=count;
        Takings.count({username:ratingData.username,'registredPassengers.name': ratingData.ratedUsername,'registredPassengers.rated': true}, function (err, count) {
            // res.send(count);
            console.log('takings'+ count)

            ratingsCount=count;
            res.send({ratings:takingsCount,takings:ratingsCount});
        });

    });
};
exports.passengerRated=function(req, res) {
    var takingsCount, ratingsCount;
    var ratingData = req.body;
    Ratings.count({username: ratingData.ratedUsername,ratedUsername:ratingData.username},function(err, count) {
        console.log('ratings'+ count);
        //res.send({reason:collection});
        takingsCount=count;
        Takings.count({username:ratingData.ratedUsername,'registredPassengers.name': ratingData.username}, function (err, count) {
            // res.send(count);
            console.log('takings'+ count)
            ratingsCount=count;
            res.send({ratings:takingsCount,takings:ratingsCount});
        });

    });
};
