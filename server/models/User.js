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
    active:Boolean
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
            User.create({email:'vladimir.rokovanov@gmail.com',firstName:'Vladimir',lastName:'Rõkovanov',username:'vladimir', mobile:'53497853',salt: salt, hashed_pwd: hash,roles: ['admin'], role:'admin',active:true});
            salt = encrypt.createSalt();
            hash = encrypt.hashPwd(salt, 'jaanus');
            User.create({email:'jaanus@gmail.com',firstName:'Jaanus',lastName:'Reindam',username:'jaanus', salt: salt, hashed_pwd: hash,roles:[], role:'supervisor',active:true});
            salt = encrypt.createSalt();
            hash = encrypt.hashPwd(salt, 'allar');
            User.create({email:'allar@gmail.com',firstName:'Allar',lastName:'Elerand',username:'allar', salt: salt, hashed_pwd: hash, role:'agent',active:false});
            salt = encrypt.createSalt();
            hash = encrypt.hashPwd(salt, 'triin');
            User.create({email:'triin@gmail.com',firstName:'Triin',lastName:'Kõrge',username:'triin', mobile:'51933516',salt: salt, hashed_pwd: hash, role:'agent',active:false});
        }
    })
}



exports.createDefaultUsers = createDefaultUsers;

