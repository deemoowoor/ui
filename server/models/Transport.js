var mongoose = require('mongoose');


var transportSchema = mongoose.Schema({
    username:String,
    startTime:Date,
    aDirection:String,
    bDirection:String,
    seatPlace:String,
    postWeight:String,
    postLenght:String,
    postWidth:String,
    postHight:String,
    duration:String,
    transportType:String,
    transportMark:String,
    transportYear:String
});
var Transport = mongoose.model('Transport', transportSchema);

function createDefaultTransports() {
    Transport.find({}).exec(function(err, collection) {
        if(collection.length === 0) {
            Transport.create({username:"Vladimir Rõkovanov",startTime: new Date('2010-03-29 20:15:34'), aDirection:"Tallinn",bDirection:"Tõrva",seatPlace:"3",duration: '3.45',transportType:"Kaubik",transportMark:"Ford Transit",transportYear:"2009"});
            Transport.create({username:"Vladimir Rõkovanov",startTime: new Date('2010-03-29 20:15:34'), aDirection:"Tallinn",bDirection:"Tõrva",seatPlace:"3",duration: '3.45',transportType:"Kaubik",transportMark:"Ford Transit",transportYear:"2009"});
            Transport.create({username:"Vladimir Rõkovanov",startTime: new Date('2010-03-29 20:15:34'), aDirection:"Tallinn",bDirection:"Tõrva",seatPlace:"3",duration: '3.45',transportType:"Kaubik",transportMark:"Ford Transit",transportYear:"2009"});
 }

    })
}

exports.createDefaultTransports = createDefaultTransports;