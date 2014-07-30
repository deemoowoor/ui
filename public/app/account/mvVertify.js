angular.module('app').factory('mvVertify', function($resource) {
    var UserResource = $resource('/api/vertify/:id', {_id: "@id"}, {
        update: {method:'PUT',isArray:false}
    });

    return UserResource;
});