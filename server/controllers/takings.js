var Taking = require('mongoose').model('Taking');

exports.getTakings = function(req, res) {
    Taking.find(req.query).exec(function(err, collection) {
        res.send(collection);
        console.log(req.query.username);
    })
};
exports.createTaking = function(req, res){
    var takingData = req.body;
    console.log(takingData);

    Taking.create(takingData, function(err, taking) {
        if(err) {
        }
        console.log(taking)

        res.send(taking);
    })



};
exports.updateTaking = function(req, res) {
    var takingUpdates = req.body;

    console.log(takingUpdates);



    Taking.findOneAndUpdate({_id:req.body._id},{
        seatPlace:takingUpdates.seatPlace,
        registredPassengers: takingUpdates.registredPassengers}).exec(function(err, course) {
        res.send(course);


    })
};
