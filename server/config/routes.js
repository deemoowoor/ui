var auth = require('./auth'),
    transports = require('../controllers/transports'),
    takings = require('../controllers/takings'),
    messages = require('../controllers/messages'),
    users = require('../controllers/users'),
    courses = require('../controllers/courses'),
    calls = require('../controllers/calls'),
    roles = require('../controllers/roles'),
    groups = require('../controllers/groups'),
    mongoose = require('mongoose'),
    User = mongoose.model('User');

module.exports = function(app) {

    app.get('/api/transports', transports.getTransports);
    app.post('/api/transports', transports.createTransport);

    app.get('/api/takings', takings.getTakings);
    app.post('/api/takings', takings.createTaking);
    app.put('/api/takings', takings.updateTaking);

    app.get('/api/messages', messages.getMessages);
    app.post('/api/messages', messages.sendMessage);
    app.get('/api/roles', roles.getRoles);
    app.put('/api/roles', roles.updateRole);
    app.post('/api/roles', roles.createRole);
    app.post('/api/roles/delete', roles.deleteRole);


    app.get('/api/groups', groups.getGroups);
    app.post('/api/groups', groups.createGroup);
    
    app.get('/api/calls', calls.getCalls);
    app.post('/api/calls', calls.createCall);
   // app.get('/api/users', auth.requiresRole('admin'), users.getUsers);
    app.get('/api/users', users.getUsers);
    app.post('/api/users', users.createUser);
    //app.put('/api/users', users.updateUserByAdmin);
    app.put('/api/users', users.updateUser);
    app.put('/api/usersbyadmin', users.updateUserByAdmin);
    app.put('/api/vertify', users.vertify);
    app.get('/api/vertify', users.getUsers);

    app.post('/api/users/delete', users.deleteUser);


    app.get('/api/custom', courses.getCourses);
    app.get('/api/custom/:id', courses.getCourseById);
    app.post('/api/custom', courses.createCourse);
    app.post('/api/custom/delete', courses.deleteCourse);

    app.get('/partials/*', function(req, res) {
        res.render('../../public/app/' + req.params);
    });

    app.post('/login', auth.authenticate);

    app.post('/logout', function(req, res) {
        req.logout();
        res.end();
    });


    app.all('/api/*', function(req, res) {
        res.send(404);
    });


    app.get('*', function(req, res) {
        var us=req.user;
        var vana=req.user;
        if(!!vana)
        {

            delete vana.firstName;
      //  var key= 'salt';
     //
        }
        res.render('index', {
            bootstrappedUser: us,
            uus: vana
        });
    });
}