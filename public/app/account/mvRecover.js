angular.module('app').factory('mvRecover', function($resource) {
    var UserResource = $resource('/api/recover/:id', {_id: "@id"}, {
        update: {method:'PUT',isArray:false}
    });

    return UserResource;
});