var mongoose = require('mongoose'),
    encrypt = require('../utilities/encryption');

var userSchema = mongoose.Schema({
    email: {type:String, required:'{PATH} is required!',
        unique:true},
    firstName: {type:String, required:'{PATH} is required!'},
    lastName: {type:String, required:'{PATH} is required!'},
    username: {
        type: String,
        required: '{PATH} is required!',
        unique:true
    },
    mobile: String,
    salt: {type:String, required:'{PATH} is required!'},
    hashed_pwd: {type:String, required:'{PATH} is required!'},
    roles: [String],
    role: String,
    active:Boolean,
    rating:Number,
    messages:Number,
    date:Date
});

userSchema.methods = {
    authenticate: function(passwordToMatch) {
        return encrypt.hashPwd(this.salt, passwordToMatch) === this.hashed_pwd;
    },
    hasRole: function(role) {
        return this.roles.indexOf(role) > -1;
    }
};
var User = mongoose.model('User', userSchema);


function createDefaultUsers() {
    User.find({}).exec(function(err, collection) {
        if(collection.length === 0) {
            var salt, hash;
            salt = encrypt.createSalt();
            hash = encrypt.hashPwd(salt, 'v');
            User.create({email:'vladimir.rokovanov@gmail.com',firstName:'Vladimir',lastName:'Rõkovanov',username:'vlarok', mobile:'53497853',salt: salt, hashed_pwd: hash,roles: ['admin','agent'], role:'Administrator',active:true,rating:10,messages:5});
            salt = encrypt.createSalt();
            hash = encrypt.hashPwd(salt, 'triin');
            User.create({email:'vlaroksss@hotmail.com',firstName:'Triin',lastName:'Kõrge',username:'triin', mobile:'51933516',salt: salt, hashed_pwd: hash,roles: ['agent'], role:'Tavakasutaja',active:true});
            salt = encrypt.createSalt();
            hash = encrypt.hashPwd(salt, 'fsfwfewfd323332');
            User.create({email:'admin@peale.ee',firstName:'admin',lastName:'admin',username:'admin', mobile:'',salt: salt, hashed_pwd: hash,roles: ['agent'], role:'agent',active:false});
            hash = encrypt.hashPwd(salt, 'fsfwfewfd323332');
            User.create({email:'administrator@peale.ee',firstName:'administrator',lastName:'administrator',username:'administrator', mobile:'',salt: salt, hashed_pwd: hash,roles: ['agent'],active:false});
            hash = encrypt.hashPwd(salt, 'fsfwfewfd323332');
            User.create({email:'administraator@peale.ee',firstName:'administraator',lastName:'administraator',username:'administraator', mobile:'',salt: salt, hashed_pwd: hash,roles: ['agent'],active:false});
            hash = encrypt.hashPwd(salt, 'fsfwfewfd323332');
            User.create({email:'moderator@peale.ee',firstName:'moderator',lastName:'moderator',username:'moderator', mobile:'',salt: salt, hashed_pwd: hash,roles: ['agent'],active:false});
            hash = encrypt.hashPwd(salt, 'fsfwfewfd323332');
            User.create({email:'moderaator@peale.ee',firstName:'moderaator',lastName:'moderaator',username:'moderaator', mobile:'',salt: salt, hashed_pwd: hash,roles: ['agent'],active:false});
            hash = encrypt.hashPwd(salt, 'fsfwfewfd323332');
            User.create({email:'vladimir@peale.ee',firstName:'vladimir',lastName:'vladimir',username:'vladimir', mobile:'',salt: salt, hashed_pwd: hash,roles: ['agent'],active:false});


        }
    })

}









exports.createDefaultUsers = createDefaultUsers;

