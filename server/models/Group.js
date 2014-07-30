var mongoose = require('mongoose');


var courseSchema = mongoose.Schema({
    name:String,
    creationDate:Date,
    active:Boolean,
    members:[String]
});
var Group = mongoose.model('Group', courseSchema);

function createDefaultGroups() {
    Group.find({}).exec(function(err, collection) {
        if(collection.length === 0) {
            Group.create({name:'Sales',creationDate: new Date('2010-03-29 20:15:34'),active: true});
            Group.create({name:'Support',creationDate: new Date('2010-03-29 20:15:34'),active: true,members:['Vladimir Rõkovanov','Jaanus Reindam']});
        }
    })
}

exports.createDefaultGroups = createDefaultGroups;
