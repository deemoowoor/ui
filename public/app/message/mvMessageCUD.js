angular.module('app').factory('mvMessageCUD', function($http, mvIdentity, $q, mvMessage) {
    return {
        sendMessage: function(newMessageData) {
            var newMessage = new mvMessage(newMessageData);
            var dfd = $q.defer();

            newMessage.$save().then(function(response) {



                //  mvIdentity.currentUser = newCourse;
                dfd.resolve(response._id);
            }, function(response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        }
    }
});