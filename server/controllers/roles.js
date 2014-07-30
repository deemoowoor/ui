var Role = require('mongoose').model('Role');

exports.getRoles = function(req, res) {
    Role.find({}).exec(function(err, collection) {
        res.send(collection);
    })
};
exports.updateRole = function(req, res) {
    var roleUpdates = req.body;

    console.log(roleUpdates.name);



    Role.findOneAndUpdate({_id:req.body._id},{name: roleUpdates.name, activationDate:roleUpdates.activationDate, active:roleUpdates.active}).exec(function(err, course) {
        res.send(course);


    })
};


exports.createRole = function(req, res){
    var roleData = req.body;
    console.log(roleData);

    Role.create(roleData, function(err, role) {
        if(err) {

        }
        console.log(role)

            res.send(role);
        })



};
exports.deleteRole = function(req, res) {


    Role.findOneAndRemove({_id:req.body._id}).exec(function(err, role) {
        res.send(role);


    })
};