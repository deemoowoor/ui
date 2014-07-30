angular.module('app').factory('mvTakingCUD', function($http, mvIdentity, $q, mvTaking) {
    return {
        createTaking: function(newTakingData) {
            var newTaking = new mvTaking(newTakingData);
            var dfd = $q.defer();

            newTaking.$save().then(function(response) {



                //  mvIdentity.currentUser = newCourse;
                dfd.resolve(response._id);
            }, function(response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        },
        updateTaking:function(newTakingData){

            var dfd = $q.defer();

            newTakingData.$update().then(function() {

                //  mvIdentity.currentUser = newCourse;
                dfd.resolve();
            }, function(response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        }
    }
});