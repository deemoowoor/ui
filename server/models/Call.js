var mongoose = require('mongoose');


var courseSchema = mongoose.Schema({
    startTime:Date,
    duration:String,
    inOut:String,
    aNumber:String,
    bNumber:String,
    username:String,
    filename:String,
    service:String
});
var Call = mongoose.model('Call', courseSchema);

function createDefaultCalls() {
    Call.find({}).exec(function(err, collection) {
        if(collection.length === 0) {
            Call.create({startTime: new Date('2010-03-29 20:15:34'), duration: '44',inOut: 'in',aNumber: '51933516', bNumber:'5108008',username:"Vladimir Rõkovanov",filename: "20140331140303_178976", service:'TalQms'});
            Call.create({startTime: new Date('2010-03-29 20:15:34'), duration: '44',inOut: 'in',aNumber: '51933516', bNumber:'5108008',username:"Vladimir Rõkovanov",filename: "20140331140303_178975", service:'HelQms'});
            Call.create({startTime: new Date('2010-03-29 20:15:34'), duration: '44',inOut: 'in',aNumber: '51933516', bNumber:'5108008',username:"Vladimir Rõkovanov",filename: "20140331140303_178976", service:'TalQms'});
            Call.create({startTime: new Date('2010-03-29 20:15:34'), duration: '44',inOut: 'in',aNumber: '51933516', bNumber:'5108008',username:"Vladimir Rõkovanov",filename: "20140331140303_178975", service:'HelQms'});
        }
    })
}

exports.createDefaultCalls = createDefaultCalls;