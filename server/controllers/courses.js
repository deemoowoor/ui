var Course = require('mongoose').model('Course');

exports.getCourses = function(req, res) {
  Course.find({}).exec(function(err, collection) {
    res.send(collection);
  })
};

exports.createCourse = function(req, res){
    var courseData = req.body;
    console.log(courseData);

    Course.create(courseData, function(err, user) {
        if(err) {
            if(err.toString().indexOf('E11000') > -1) {
                err = new Error('Duplicate Username');
            }
            res.status(400);
            return res.send({reason:err.toString()});
        }
        req.logIn(user, function(err) {
            if(err) {return next(err);}
            res.send(user);
        })


})
};

exports.getCourseById = function(req, res) {
    Course.findOne({_id:req.params.id}).exec(function(err, course) {
        res.send(course);
    })


};

exports.deleteCourse = function(req, res) {


    Course.findOneAndRemove({_id:req.body._id}).exec(function(err, course) {
        res.send(course);


    })
}
