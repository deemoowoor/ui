angular.module('app').factory('mvWish', function($resource) {
    var TakingsResource = $resource('/api/wishes/:id', {_id: "@id"}, {
        update: {method:'PUT',isArray:false},
        delete: {method:'DELETE',isArray:false}

    });

    return TakingsResource;
});