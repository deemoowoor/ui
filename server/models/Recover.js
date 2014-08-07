var mongoose = require('mongoose');


var recoverSchema = mongoose.Schema({
    username:String,
    email:String,
    requestDate:Date,
    active:Boolean


});
var Recover = mongoose.model('Recover', recoverSchema);
function createDefaultRecovers() {
    Recover.find({}).exec(function(err, collection) {
        if(collection.length === 0) {
          //  Recover.create({username:"vladimir",email:"vladimir.rokovanov@gmail.com",requestDate: new Date()});
     }
    })
}


exports.createDefaultRecovers = createDefaultRecovers;