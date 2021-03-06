var express = require('express'),
    stylus = require('stylus'),
    passport = require('passport');

module.exports = function(app, config) {
    function compile(str, path) {
        return stylus(str).set('filename', path);
    }

    app.configure(function() {
        app.use(require('prerender-node').set('prerenderToken', 'tijwBP7M0nv9256dLkWe'));
        app.set('views', config.rootPath + '/server/views');
        app.set('view engine', 'jade');
        app.use(express.limit('3mb'));
        app.use(express.logger('dev'));
        app.use(express.cookieParser());
       // app.use(express.bodyParser({ keepExtensions: true, uploadDir: config.rootPath  + '/public/uploads' }));
        app.use(express.bodyParser());
        app.use(express.session({secret: 'multi vision unicorns'}));
        app.use(passport.initialize());
        app.use(passport.session());

        app.use(stylus.middleware(
            {
                src: config.rootPath + '/public',
                compile: compile
            }
        ));
        app.use(express.static(config.rootPath + '/public'));
    });
}