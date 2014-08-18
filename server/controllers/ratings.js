var Ratings = require('mongoose').model('Rating');

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
    var myDate=new Date();
    console.log('rated date '+ myDate);
    myDate.setHours(myDate.getHours() - 12)
    var ratingData = req.body;
    Ratings.count({ratedDate:  {$gt:myDate},username: ratingData.username,ratedUsername:ratingData.ratedUsername}).exec(function(err, collection) {
        console.log('rated user '+ collection);
        console.log('rated data '+ ratingData);
        console.log('rated date '+ myDate);
        res.send({reason:collection});
    })
};
