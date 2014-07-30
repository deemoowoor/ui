angular.module('app').factory('mvGroup', function($resource) {
    var GroupResource = $resource('/api/groups/:id', {_id: "@id"}, {
        update: {method:'PUT',isArray:false}

    });

    return GroupResource;
});