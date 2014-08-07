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