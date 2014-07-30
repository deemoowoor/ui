angular.module('app').factory('mvCall', function($resource) {
    var CallsResource = $resource('/api/calls/:id', {_id: "@id"}, {
        update: {method:'PUT',isArray:false},
        delete: {method:'DELETE',isArray:false}

    });

    return CallsResource;
});