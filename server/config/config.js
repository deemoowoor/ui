var path= require('path');
var rootPath=path.normalize(__dirname +'/../../');
module.exports ={
    development:{
        db:'mongodb://localhost/logistic',
        rootPath:rootPath,
        port: process.env.PORT || 3030
    },
    production:{
        rootPath:rootPath,
        db:'mongodb://peale:dominic@ds053109.mongolab.com:53109/peale',
        port: process.env.PORT || 80
    }
}

