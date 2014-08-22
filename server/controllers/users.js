var User = require('mongoose').model('User'),
    encrypt = require('../utilities/encryption'),
    nodemailer = require('nodemailer'),
 smtpTransport = require('nodemailer-smtp-transport');


var transporter = nodemailer.createTransport(smtpTransport({
    host: 'smtp.zone.ee',
    port: 587,
    auth: {
        user: 'portaal@peale.ee',
        pass: '235562690Portaal'
    },
    maxConnections: 5,
    maxMessages: 10
}));


exports.getUsers = function(req, res) {
    User.find({}).exec(function(err, collection) {

        res.send(collection);
    })
};

exports.userExists=function(req, res) {
    User.count({username:req.body.username}).exec(function(err, collection) {
        console.log('dsd '+ collection);
        res.send({reason:collection});
    })
};

exports.createUser = function(req, res, next) {
    var userData = req.body;
    userData.username = userData.username.toLowerCase();
    userData.email = userData.email.toLowerCase();

    console.log(userData.username);
    userData.salt = encrypt.createSalt();
    userData.hashed_pwd = encrypt.hashPwd(userData.salt, userData.password);
    userData.date=new Date();
    User.create(userData, function(err, user) {
        if(err) {
            console.log(err);
            if(err.toString().indexOf('$username_1') > -1) {
                err = new Error('See kasutajanimi on juba kasutusel');


            }
            if(err.toString().indexOf('$email_1') > -1) {
                err = new Error('Seda emaili aadressit on korra kasutatud');

            }
            res.status(400);
            return res.send({reason:err.toString()});
        }
        req.logIn(user, function(err) {
            if(err) {return next(err);}
            res.send(user);

            transporter.sendMail({
                from: 'portaal@peale.ee',
                to: user.email,
                subject: 'peale.ee ',
                text: 'kinnitage oma email http://www.peale.ee/vertify/' + user._id
            });
        })
    })
};

exports.updateUser = function(req, res) {
    var userUpdates = req.body;
if(!req.body.activatin){
    if(req.user._id != userUpdates._id && !req.user.hasRole('admin')) {
        res.status(403);
        return res.end();
    }
console.log(userUpdates.prvemail)
    console.log('email '+ userUpdates.email)
    req.user.firstName = userUpdates.firstName;
    req.user.lastName = userUpdates.lastName;
    req.user.email = userUpdates.email.toLowerCase();
    req.user.mobile = userUpdates.mobile;
    req.user.role=userUpdates.role;
    var first=userUpdates.email;
    var second=userUpdates.prvemail.toLowerCase();
    if(first !== second){
        req.user.active=false;
    }


    console.log(req.user.active);
    if(userUpdates.password && userUpdates.password.length > 0) {
        req.user.salt = encrypt.createSalt();
        req.user.hashed_pwd = encrypt.hashPwd(req.user.salt, userUpdates.password);
    }
    req.user.save(function(err) {
        if(err) { res.status(400); return res.send({reason:err.toString()});}
        res.send(req.user);
    });}
    else{

    transporter.sendMail({
        from: 'portaal@peale.ee',
        to: req.user.email,
        subject: 'peale.ee ',
        text: 'kinnitage oma email http://www.peale.ee/vertify/' + req.user._id
    });
    res.send('saadetud');

}
};



exports.updateUserByAdmin = function(req, res) {
    var userUpdates = req.body;



    User.findOneAndUpdate({_id:req.body._id},{username: userUpdates.username, firstName:userUpdates.firstName, lastName:userUpdates.lastName, active:userUpdates.active, role:userUpdates.role}).exec(function(err, user) {
        res.send(user);


    })
};


exports.vertify = function(req, res) {
    var userUpdates = req.body;
    console.log(userUpdates)

    User.findOneAndUpdate({_id:req.body._id},{active:true}).exec(function(err, user) {


    });

};




exports.deleteUser = function(req, res) {


    User.findOneAndRemove({_id:req.body._id}).exec(function(err, user) {
        res.send(user);


    })
};

exports.getVertifyData = function(req, res) {
    console.log('siin peaks'+req.body.id)
    User.findOne({_id:req.body.id}).exec(function(err, data) {
        res.send(data);
        console.log(data)
    })


};