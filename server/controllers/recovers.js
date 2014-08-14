var Recover = require('mongoose').model('Recover');
var User = require('mongoose').model('User'),encrypt = require('../utilities/encryption');
exports.createRecover = function(req, res){
    var recoverEmail = req.body;
    console.log(recoverEmail);




        User.findOne({email:recoverEmail.email}, function(err, user) {

            if(user!= null){
                Recover.findOneAndUpdate({username: user.username,active:true},{active:false}).exec(function(err, user) {


                });

                var extendRecoverEmail = {
                    username:user.username,
                    email: recoverEmail.email,
                    requestDate: new Date(),
                    active:true
                };

                Recover.create(extendRecoverEmail, function(err, recover) {
                    if(err) {

                    }
                    res.send({reason:"on lihtlsat"});
                })
            }
            else{
            res.send({reason:"ei ole olemas"});
            }
        });

};

exports.getRecover = function(req, res) {
    Recover.find(req.query).exec(function(err, collection) {
        res.send(collection);

    })
};

exports.getRecoverById = function(req, res) {
    Recover.findOne({_id:req.params.id}).exec(function(err, course) {
        res.send(course);
    })


};


exports.getRecoverData = function(req, res) {
    console.log('siin peaks'+req.body.id)
    Recover.findOne({_id:req.body.id}).exec(function(err, data) {
        res.send(data);
        console.log(data)
    })


};
exports.updatePassword = function(req, res) {
    var userUpdates = req.body;
    var salt, hash;
    console.log(userUpdates.username+''+userUpdates.password)
    salt = encrypt.createSalt();
    hash = encrypt.hashPwd(salt, userUpdates.password);
    console.log("mika vitu");

    User.findOneAndUpdate({username: userUpdates.username},{hashed_pwd: hash, salt:salt}).exec(function(err, user) {
        res.send(user);

    });
    Recover.findOneAndUpdate({username: userUpdates.username,active:true},{active:false}).exec(function(err, user) {


    });

};