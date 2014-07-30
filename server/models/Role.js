var mongoose = require('mongoose');


var courseSchema = mongoose.Schema({
    name:String,
    activationDate:Date,
    active:Boolean,
    listenAllCalls:Boolean,
    listenOwnCalls:Boolean

});
var Role = mongoose.model('Role', courseSchema);

function createDefaultRoles() {
    Role.find({}).exec(function(err, collection) {
        if(collection.length === 0) {
            Role.create({name:'admin',activationDate: new Date('2010-03-29 20:15:34'),active: true});
            Role.create({name:'supervisor',activationDate: new Date('2010-03-29 20:15:34'),active: true});
            Role.create({name:'agent',activationDate: new Date('2010-03-29 20:15:34'),active: true});

        }
    })
}

exports.createDefaultRoles = createDefaultRoles;