var Message = require('mongoose').model('Message');
var nodemailer = require('nodemailer');
var User = require('mongoose').model('User');


var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'vladimir.rokovanov@gmail.com',
        pass: '235562690Gmail'
    }
});

exports.getMessages = function(req, res) {
    Message.find(req.query).exec(function(err, collection) {
        res.send(collection);
        console.log(req.query.username);
    })
};
exports.sendMessage = function(req, res){
    var messageData = req.body;
   // console.log(messageData);

    Message.create(messageData, function(err, message) {
        if(err) {
        }

        res.send(message);
        console.log(message);

    User.findOne({username:message.sender}).exec(function(err, user) {



    transporter.sendMail({
        from: 'vladimir.rokovanov@gmail.com',
        to: user.email,
        subject: 'peale.ee teavitab et ' +message.sender+ ' soovib peale',
        text: 'hello world!'
    });

})





    });



};


