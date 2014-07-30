angular.module('app').factory('mvVertifyCUD', function($http, mvIdentity, $q) {
    return {
        vertify:function(newUserData){

            var dfd = $q.defer();

            newUserData.$update().then(function() {

                //  mvIdentity.currentUser = newCourse;
                dfd.resolve();
            }, function(response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        }

    }
});