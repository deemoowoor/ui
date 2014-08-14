var Taking = require('mongoose').model('Taking');

exports.getTakings = function(req, res) {
    var start=new Date();
    var customQuery=req.query;
   // console.log(req.query.time)
    if(req.query.time)
    {
        customQuery={startTime:  {$gte:start}};
    }

    Taking.find(customQuery).exec(function(err, collection) {
        res.send(collection);
        //  console.log(req.query);
       // console.log({startTime:  {$gte:start}});
    })
};
exports.createTaking = function(req, res){
    var takingData = req.body;
    console.log(takingData);

    Taking.create(takingData, function(err, taking) {
        if(err) {
        }
        console.log(taking)

        res.send(taking);
    })



};
exports.updateTaking = function(req, res) {
    var takingUpdates = req.body;

    console.log(takingUpdates);



    Taking.findOneAndUpdate({_id:req.body._id},{
        seatCount:takingUpdates.seatCount,
        registredPassengers: takingUpdates.registredPassengers,ended:takingUpdates.ended,canceled:takingUpdates.canceled}).exec(function(err, course) {
        res.send(course);


    })
};

exports.updateToRated = function(req, res) {
    var takingUpdates = req.body;

//    console.log('uuendus info' +takingUpdates);
  //  console.log('connection : %j', takingUpdates);


    Taking.findOneAndUpdate({'registredPassengers._id':req.body._id,'registredPassengers.rated':false},{
        $set:{'registredPassengers.$.rated': true}}).exec(function(err, course) {
        res.send(course);
        console.log('see on id'+ req.body._id);
        console.log('connection : %j', course);
        console.log('connection : %j', err);
    })


};

exports.cancel = function(req, res) {
    var takingUpdates = req.body;

//    console.log('uuendus info' +takingUpdates);
    //  console.log('connection : %j', takingUpdates);


    Taking.findOneAndUpdate({'registredPassengers._id':req.body._id},{
        $set:{'registredPassengers.$.canceledByPassenger': true,'seatCount': req.body.seatCount}}).exec(function(err, course) {
        res.send(course);
        console.log('see on id'+ req.body._id);
        console.log('connection : %j', course);
        console.log('connection : %j', err);
    })


};


