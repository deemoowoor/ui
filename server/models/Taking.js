var mongoose = require('mongoose');

var registredPassengersSchema = mongoose.Schema({
    name:String,
    date:Date,
    canceledByPassenger:Boolean,
    rated:Boolean,
    ratedByPassaneger:Boolean
    });

var takingSchema = mongoose.Schema({
    username:String,
    startTime:Date,
    aDirection:String,
    bDirection:String,
    seatPlace:String,
    seatCount:String,
    postWeight:String,
    postLenght:String,
    postWidth:String,
    postHight:String,
    duration:String,
    transportType:String,
    transportMark:String,
    transportYear:String,
    registredPassengers: [registredPassengersSchema],
    info:String,
    canceled:Boolean,
    ended:Boolean,
    deleted:Boolean,
    package:Boolean




});
var Taking = mongoose.model('Taking', takingSchema);
function createDefaultTakings() {
    Taking.find({}).exec(function(err, collection) {
        if(collection.length === 0) {
     //       Taking.create({username:"triin",startTime: new Date('2010-03-29 20:15:34'), aDirection:"Tallinn",bDirection:"Tõrva",seatPlace:"3",duration: '3.45',transportType:"Kaubik",transportMark:"Ford Transit",transportYear:"2009",info:"Võtan peale bussijaamast 2 inimest"});
     //       Taking.create({username:"allar",startTime: new Date('2010-03-29 20:15:34'), aDirection:"Kohila",bDirection:"Tallinn",seatPlace:"3",duration: '3.45',transportType:"Kaubik",transportMark:"Ford Transit",transportYear:"2009"});
      //      Taking.create({username:"vladimir",startTime: new Date('2010-03-29 20:15:34'), aDirection:"Rapla",bDirection:"Keila",seatPlace:"3",duration: '3.45',transportType:"Kaubik",transportMark:"Ford Transit",transportYear:"2009",registredPassengers:[{name:'triin', date:new Date('2010-03-29 20:15:34'),rated:false},{name:'allar', date:new Date('2010-03-29 20:15:34'),rated:false},{name:'jaanus', date:new Date('2010-03-29 20:15:34'),rated:false}]});
     }
    })



}


exports.createDefaultTakings = createDefaultTakings;