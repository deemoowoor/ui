var Transport = require('mongoose').model('Transport');

exports.getTransports = function(req, res) {
    Transport.find({}).exec(function(err, collection) {
        res.send(collection);
    })
};
exports.createTransport = function(req, res){
    var transportData = req.body;
    console.log(transportData);

    Transport.create(transportData, function(err, transport) {
        if(err) {
        }
        console.log(transport)

        res.send(transport);
    })



};

