angular.module('app').factory('mvTransport', function($resource) {
    var TransportsResource = $resource('/api/transports/:id', {_id: "@id"}, {
        update: {method:'PUT',isArray:false},
        delete: {method:'DELETE',isArray:false}

    });

    return TransportsResource;
});