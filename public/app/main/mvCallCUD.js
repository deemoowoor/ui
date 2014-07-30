angular.module('app').factory('mvCallCUD', function($http, mvIdentity, $q, mvCall) {
    return {
        createCall: function(newCallData) {
            var newCall = new mvCall(newCallData);
            var dfd = $q.defer();

            newCall.$save().then(function(response) {



                //  mvIdentity.currentUser = newCourse;
                dfd.resolve(response._id);
            }, function(response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        }
    }
});