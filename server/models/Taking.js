var mongoose = require('mongoose');


var takingSchema = mongoose.Schema({
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
    transportYear:String,
    registredPassengers: [{name:String,date:Date}],
    info:String


});
var Taking = mongoose.model('Taking', takingSchema);
function createDefaultTakings() {
    Taking.find({}).exec(function(err, collection) {
        if(collection.length === 0) {
            Taking.create({username:"triin",startTime: new Date('2010-03-29 20:15:34'), aDirection:"Tallinn",bDirection:"Tõrva",seatPlace:"3",duration: '3.45',transportType:"Kaubik",transportMark:"Ford Transit",transportYear:"2009",info:"Võtan peale bussijaamast 2 inimest"});
            Taking.create({username:"allar",startTime: new Date('2010-03-29 20:15:34'), aDirection:"Kohila",bDirection:"Tallinn",seatPlace:"3",duration: '3.45',transportType:"Kaubik",transportMark:"Ford Transit",transportYear:"2009"});
            Taking.create({username:"vladimir",startTime: new Date('2010-03-29 20:15:34'), aDirection:"Rapla",bDirection:"Keila",seatPlace:"3",duration: '3.45',transportType:"Kaubik",transportMark:"Ford Transit",transportYear:"2009",registredPassengers:[{name:'triin', date:new Date('2010-03-29 20:15:34')},{name:'allar', date:new Date('2010-03-29 20:15:34')},{name:'jaanus', date:new Date('2010-03-29 20:15:34')}]});
     }
    })
}


exports.createDefaultTakings = createDefaultTakings;