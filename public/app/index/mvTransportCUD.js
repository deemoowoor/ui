angular.module('app').factory('mvTransportCUD', function($http, mvIdentity, $q, mvTransport) {
    return {
        createTransport: function(newTransportData) {
            var newTransport = new mvTransport(newTransportData);
            var dfd = $q.defer();

            newTransport.$save().then(function(response) {



                //  mvIdentity.currentUser = newCourse;
                dfd.resolve(response._id);
            }, function(response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        }
    }
});