angular.module('app').factory('mvRatingCUD', function($http, mvIdentity, $q, mvRating) {
    return {
        addNewComment: function(newCommentData) {
            var newComment = new mvRating(newCommentData);
            var dfd = $q.defer();

            newComment.$save().then(function(response) {



                //  mvIdentity.currentUser = newCourse;
                dfd.resolve(response._id);
            }, function(response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        },
        setRatedToTrue:function(newTakingData){

            var dfd = $q.defer();

            newTakingData.$update().then(function() {

                //  mvIdentity.currentUser = newCourse;
                dfd.resolve();
            }, function(response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        },
        checkIfRated: function(newTakingData) {
            var dfd = $q.defer();
            $http.post('/api/checkifrated', newTakingData).then(function(response) {


                dfd.resolve(response);
            });
            return dfd.promise;
        },
        checkIfRatedbu: function(newTakingData) {
            var dfd = $q.defer();
            $http.post('/api/checkifratedbu', newTakingData).then(function(response) {


                dfd.resolve(response);
            });
            return dfd.promise;
        },
        checkpassenger: function(newTakingData) {
            var dfd = $q.defer();
            $http.post('/api/passengerrater', newTakingData).then(function(response) {


                dfd.resolve(response);
            });
            return dfd.promise;
        }
    }
});