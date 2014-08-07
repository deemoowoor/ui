angular.module('app').factory('mvRating', function($resource) {
    var RatingResource = $resource('/api/ratings/:id', {_id: "@id"}, {
        update: {method:'PUT',isArray:false}
    });

    return RatingResource;
});