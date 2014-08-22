var Taking = require('mongoose').model('Taking');

exports.getTakings = function(req, res) {
    var start=new Date();
    var customQuery=req.query;
   // console.log(req.query.time)
    if(req.query.time)
    {
        customQuery={startTime:  {$gte:start},deleted:false};
    }


    Taking.count({startTime:  {$gte:start},deleted:false}, function (err, count) {
        //console.log('I do not ever run' + count);
    });

    Taking.find(customQuery).exec(function(err, collection) {
        res.send(collection);
        //  console.log(req.query);
       // console.log({startTime:  {$gte:start}});
    })
};

exports.CountRatedTakings = function(req, res) {
//loeb kokku mitu korda on esinenud reisidokumentides ühekauapa selleks et võrrelda mitu korda on teda kommenteerinud antud isik pärast


    Taking.count({'_id': req.body._id,'registredPassengers.name': req.user.username}, function (err, count) {
        res.send(count);
        console.log(req.user.username)
    });



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

    Taking.count({'_id': req.body._id,'registredPassengers.name': req.user.username}, function (err, count) {
     //   res.send(count);

        if(count===1)
        {
            res.send({reason:true});
        }

        else{
            Taking.findOneAndUpdate({_id:req.body._id},{
                seatCount:takingUpdates.seatCount,
                registredPassengers: takingUpdates.registredPassengers,ended:takingUpdates.ended,canceled:takingUpdates.canceled,deleted:takingUpdates.deleted}).exec(function(err, course) {
                res.send(course);


            })
        }
        console.log('loeb'+ count + 'loeb id' + req.body._id)
    });



};

exports.updateToRated = function(req, res) {
    var queryS;

//    console.log('uuendus info' +takingUpdates);
  //  console.log('connection : %j', takingUpdates);
 if(req.body.rated)
     queryS={'registredPassengers.$.rated': true};
 if(req.body.ratedByPassaneger)
     queryS={'registredPassengers.$.ratedByPassaneger': true};

    Taking.findOneAndUpdate({'registredPassengers._id':req.body._id},{
        $set:queryS}).exec(function(err, course) {
        res.send(course);
        console.log('see on rated to true rated'+ req.body.rated);
        console.log('see on rated to true id'+ req.body._id);
        console.log('see on rated to true 2:', req.body);
        console.log('see on rated to true : ', course);
        console.log('see on rated to true : ', err);
    })



};

exports.canceledByPassenger = function(req, res) {
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
exports.canceledByOwner = function(req, res) {
    var takingUpdates = req.body;

//    console.log('uuendus info' +takingUpdates);
    //  console.log('connection : %j', takingUpdates);


    Taking.findOneAndUpdate({'registredPassengers._id':req.body._id},{
        $set:{'registredPassengers.$.canceledByOwner': true,'seatCount': req.body.seatCount}}).exec(function(err, course) {
        res.send(course);
        console.log('see on id'+ req.body._id);
        console.log('connection : %j', course);
        console.log('connection : %j', err);
    })


};


exports.checkIfRated = function(req, res) {
    var ratedData = req.body;

//    console.log('uuendus info' +takingUpdates);
    //  console.log('connection : %j', takingUpdates);
//username: username,ratedUsername:$routeParams.name, _id:$routeParams.id

    Taking.count({username:ratedData.username,'registredPassengers.name': ratedData.ratedUsername,'registredPassengers._id': ratedData._id,'registredPassengers.rated': false}, function (err, count) {
        // res.send(count);
     //   console.log('ratings on arvuta '+ count)
    //    console.log('ratings on arvuta : %j', req.body)
        res.send({response:count});
    });


};
exports.checkIfRatedByUsername = function(req, res) {
    var ratedData = req.body;

//    console.log('uuendus info' +takingUpdates);
    //  console.log('connection : %j', takingUpdates);
//username: username,ratedUsername:$routeParams.name, _id:$routeParams.id

    Taking.count({username:ratedData.username,'registredPassengers.name': ratedData.ratedUsername,'registredPassengers._id': ratedData._id,'registredPassengers.ratedByPassaneger': false}, function (err, count) {
        // res.send(count);
        console.log('ratings on arvuta '+ count)
        console.log('ratings on arvuta : %j', req.body)
        res.send({response:count});
    });


};



