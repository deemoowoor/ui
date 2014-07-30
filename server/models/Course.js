var mongoose = require('mongoose');


var courseSchema = mongoose.Schema({
  username:{type:String, required:'{PATH} is required!'},
  title: {type:String, required:'{PATH} is required!'},
  featured: {type:Boolean, required:'{PATH} is required!'},
  published: {type:Date, required:'{PATH} is required!'},
  tags: [String]
});
var Course = mongoose.model('Course', courseSchema);

function createDefaultCourses() {
  Course.find({}).exec(function(err, collection) {
    if(collection.length === 0) {
      Course.create({username: "t", title: 'PBX Data Logger', featured: true, published: new Date('10/5/2013'), tags: ['C#']});
      Course.create({username: "w", title: 'VOIP Logger', featured: true, published: new Date('10/12/2013'), tags: ['C#']});
      Course.create({username: "e", title: 'Service Crash Logger#', featured: false, published: new Date('10/1/2013'), tags: ['C#']});
      Course.create({username: "e", title: 'Event Viewer Monitoring Tool', featured: false, published: new Date('7/12/2013'), tags: ['VB']});
      Course.create({username: "r", title: 'UDP pacekt tracker Tool', featured: true, published: new Date('1/1/2013'), tags: ['C++']});
      Course.create({username: "e", title: 'Node.js alarming Tool', featured: true, published: new Date('10/13/2013'), tags: ['JS']});
  }
  })
}

exports.createDefaultCourses = createDefaultCourses;