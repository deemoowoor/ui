var mongoose = require('mongoose');

var wishSchema = mongoose.Schema({
    username:String,
    startTime:Date,
    aDirection:String,
    bDirection:String,
    info:String,
    canceled:Boolean
    });


var Wish = mongoose.model('Wish', wishSchema);
function createDefaultWishes() {
    Wish.find({}).exec(function(err, collection) {
        if(collection.length === 0) {
           Wish.create({username:"vladimir",startTime: new Date('2015-03-29 20:15:34'), aDirection:"Tallinn",bDirection:"Tõrva",info:"Minu soovid on"});
           //       Taking.create({username:"allar",startTime: new Date('2010-03-29 20:15:34'), aDirection:"Kohila",bDirection:"Tallinn",seatPlace:"3",duration: '3.45',transportType:"Kaubik",transportMark:"Ford Transit",transportYear:"2009"});
      //      Taking.create({username:"vladimir",startTime: new Date('2010-03-29 20:15:34'), aDirection:"Rapla",bDirection:"Keila",seatPlace:"3",duration: '3.45',transportType:"Kaubik",transportMark:"Ford Transit",transportYear:"2009",registredPassengers:[{name:'triin', date:new Date('2010-03-29 20:15:34'),rated:false},{name:'allar', date:new Date('2010-03-29 20:15:34'),rated:false},{name:'jaanus', date:new Date('2010-03-29 20:15:34'),rated:false}]});
     }
    })



}



exports.createDefaultWishes = createDefaultWishes;