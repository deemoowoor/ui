angular.module('app').factory('mvCour', function($http, mvIdentity, $q, mvCourse) {
    return {
        createCourse: function(newCourseData) {
            var newCourse = new mvCourse(newCourseData);
            var dfd = $q.defer();

            newCourse.$save().then(function() {

              //  mvIdentity.currentUser = newCourse;
                dfd.resolve();
            }, function(response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        },
        deleteCourse: function(course) {
            var dfd = $q.defer();
            $http.post('/api/custom/delete', course).then(function(response) {
                if(response.data.success) {
                    dfd.resolve(true);
                } else {
                    dfd.resolve(false);
                }
            });
            return dfd.promise;
        }
    }
});