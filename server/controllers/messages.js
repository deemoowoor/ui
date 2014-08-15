var Message = require('mongoose').model('Message');
var nodemailer = require('nodemailer');
var User = require('mongoose').model('User');
var smtpTransport = require('nodemailer-smtp-transport');



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
/*
        User.findOneAndUpdate({username:message.sender},{messages: +1}).exec(function(err, user) {



        })
 */
        User.findOne({username:message.sender}, function (err, user) {
            user.messages = user.messages+1;

            user.save(function (err) {
                if(err) {
                    console.error('ERROR!');
                }
            });
        });

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


