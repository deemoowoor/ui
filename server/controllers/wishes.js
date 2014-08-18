var Wish = require('mongoose').model('Wish');


exports.getWishes = function(req, res) {
    var start=new Date();
    var customQuery=req.query;
    // console.log(req.query.time)
    if(req.query.time)
    {
        customQuery={startTime:  {$gte:start},deleted:false};
    }

    Wish.find(customQuery).exec(function(err, collection) {
        res.send(collection);
        //  console.log(req.query);
        // console.log({startTime:  {$gte:start}});
    })
};


exports.createWish = function(req, res){
    var wishData = req.body;
    console.log(wishData);

    Wish.create(wishData, function(err, taking) {
        if(err) {
        }
        console.log(taking)

        res.send(taking);
    })



};

exports.updateWish = function(req, res) {
    var takingUpdates = req.body;

    console.log(takingUpdates);



    Wish.findOneAndUpdate({_id:req.body._id},{canceled:takingUpdates.canceled,deleted:takingUpdates.deleted}).exec(function(err, course) {
        res.send(course);


    })
};
