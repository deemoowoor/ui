angular.module('app').factory('mvRole', function($resource) {
    var RoleResource = $resource('/api/roles/:id', {_id: "@id"}, {
        update: {method:'PUT',isArray:false}

    });

    return RoleResource;
});