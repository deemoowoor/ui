angular.module('app').factory('mvMessage',function($resource){
    var mvMessageResource = $resource('/api/messages/:id', {_id: "@id"}, {
        update: {method:'PUT',isArray:false},
        delete: {method:'DELETE',isArray:false}

    });

    return mvMessageResource;
})