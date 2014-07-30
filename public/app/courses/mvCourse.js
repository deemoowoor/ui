angular.module('app').factory('mvCourse', function($resource) {

    var CourseResource = $resource('/api/custom/:id', {_id: "@id"}, {
        update: {method:'PUT',isArray:false},
        delete: {method:'DELETE',isArray:false}

    });

    return CourseResource;
});