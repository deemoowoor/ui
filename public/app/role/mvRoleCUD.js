angular.module('app').factory('mvRoleCUD', function($http, mvIdentity, $q, mvRole) {
    return {
        createRole: function(newCourseData) {
            var newCourse = new mvRole(newCourseData);
            var dfd = $q.defer();

            newCourse.$save().then(function(response) {



                //  mvIdentity.currentUser = newCourse;
                dfd.resolve(response._id);
            }, function(response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        },
        deleteRole: function(role) {
            var dfd = $q.defer();
            $http.post('/api/roles/delete', role).then(function(response) {
                if(response.data.success) {
                    dfd.resolve(true);
                } else {
                    dfd.resolve(false);
                }
            });
            return dfd.promise;
        },
        updateCurrentRole:function(newRoleData){

            var dfd = $q.defer();

            newRoleData.$update().then(function() {

                //  mvIdentity.currentUser = newCourse;
                dfd.resolve();
            }, function(response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        }
    }
});