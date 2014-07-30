angular.module('app').factory('mvTaking', function($resource) {
    var TakingsResource = $resource('/api/takings/:id', {_id: "@id"}, {
        update: {method:'PUT',isArray:false},
        delete: {method:'DELETE',isArray:false}

    });

    return TakingsResource;
});