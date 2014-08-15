angular.module('app').factory('mvWishCUD', function($http, mvIdentity, $q, mvWish) {
    return{
        createWish: function(newWishData) {
            var newTaking = new mvWish(newWishData);
            var dfd = $q.defer();

            newTaking.$save().then(function(response) {



                //  mvIdentity.currentUser = newCourse;
                dfd.resolve(response._id);
            }, function(response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        },
        updateWish:function(newTakingData){

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