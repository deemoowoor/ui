var mongoose = require('mongoose'),
    transportModel = require('../models/Transport'),
    takingModel = require('../models/Taking'),
   userModel = require('../models/User'),
  courseModel = require('../models/Course'),
callModel = require('../models/Call'),
    roleModel = require('../models/Role'),
groupModel=require('../models/Group');
messageModel=require('../models/Message');
recoverModel=require('../models/Recover');
ratingModel=require('../models/Rating');
module.exports = function(config) {
    mongoose.connect(config.db);
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error...'));
    db.once('open', function callback() {
        console.log('multivision db opened');
    });


    userModel.createDefaultUsers();
    courseModel.createDefaultCourses();
    callModel.createDefaultCalls();
    roleModel.createDefaultRoles();
    groupModel.createDefaultGroups();
    transportModel.createDefaultTransports();
    takingModel.createDefaultTakings();
    messageModel.createDefaultMessages();
    recoverModel.createDefaultRecovers();
    ratingModel.createDefaultRatings();

};