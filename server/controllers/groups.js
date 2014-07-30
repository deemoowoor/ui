var Group = require('mongoose').model('Group');

exports.getGroups = function(req, res) {
    Group.find({}).exec(function(err, collection) {
        res.send(collection);
    })
};
exports.updateGroup = function(req, res) {
    var groupUpdates = req.body;

    console.log(groupUpdates.name);



    Group.findOneAndUpdate({_id:req.body._id},{name: groupUpdates.name, creationDate:groupUpdates.creationDate, active:groupUpdates.active}).exec(function(err, group) {
        res.send(group);


    })
};


exports.createGroup = function(req, res){
    var groupData = req.body;
    console.log(groupData);

    Group.create(groupData, function(err, group) {
        if(err) {

        }
        console.log(group)

            res.send(group);
        })



};
exports.deleteGroup = function(req, res) {


    Group.findOneAndRemove({_id:req.body._id}).exec(function(err, role) {
        res.send(role);


    })
};