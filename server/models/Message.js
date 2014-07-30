var mongoose = require('mongoose');


var messageSchema = mongoose.Schema({
    type:String,
    title:String,
    body:String,
    sender:String,
    recepier:String,
    sentDate:Date,
    getDate:Date,
    isReaded:Boolean,
    responses:[{Title:String,
        sentDate:Date,
        getDate:Date,
        isReaded:Boolean}]
});
var Message = mongoose.model('Message', messageSchema);

function createDefaultMessages() {
    Message.find({}).exec(function(err, collection) {
        if(collection.length === 0) {
            Message.create({
                type:'conversation',
                title:'See on esimene sõnum',
                body:'Siin on esimene sisu',
                sender:'vladimir',
                recepier:'triin',
                sentDate:new Date(),
                getDate: new Date('2010-03-29 20:15:34'),
                isReaded:true,
                responses:[{Title:'esimene vastust',
                    sentDate:new Date(),
                    getDate:'',
                    isReaded:false}]});
            Message.create({
                type:'conversation',
                title:'See on teine sõnum',
                body:'Siin on teine sisu',
                sender:'allar',
                recepier:'vladimir',
                sentDate:new Date(),
                getDate: new Date('2010-03-29 20:15:34'),
                isReaded:true,
                responses:[{Title:'teine vastust',
                    sentDate:new Date(),
                    getDate:'',
                    isReaded:false}]});
            Message.create({
                type:'conversation',
                title:'See on kolmas sõnum',
                body:'Siin on kolmas sisu',
                sender:'triin',
                recepier:'vladimir',
                sentDate:new Date(),
                getDate: new Date('2010-03-29 20:15:34'),
                isReaded:false,
                responses:[{Title:'kolmas vastust',
                    sentDate:new Date(),
                    getDate:'',
                    isReaded:false}]});
              }
    })
}




exports.createDefaultMessages = createDefaultMessages;
