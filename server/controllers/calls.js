var Call = require('mongoose').model('Call');

exports.getCalls = function(req, res) {
    Call.find({}).exec(function(err, collection) {
        res.send(collection);
    })
};
exports.createCall = function(req, res){
    var callData = req.body;
    console.log(callData);

    Call.create(callData, function(err, role) {
        if(err) {

        }
        console.log(role)

        res.send(role);
    })



};

