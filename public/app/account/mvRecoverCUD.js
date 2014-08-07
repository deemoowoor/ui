angular.module('app').factory('mvRecoverCUD', function($http,mvRecover, mvUser, mvIdentity, $q) {
    return {
        recoverEmail: function(newRecoverEmail) {
            var newRecover = new mvRecover(newRecoverEmail);
            var dfd = $q.defer();

            newRecover.$save().then(function(response) {



                //  mvIdentity.currentUser = newCourse;
                dfd.resolve(response._id);
            }, function(response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        },
        updatePassword: function(newPasswordInf){
            var newUser = new mvUser();

            var dfd = $q.defer();
            alert(newUser.username)
            newPasswordInf.$update().then(function() {

                //  mvIdentity.currentUser = newCourse;
                dfd.resolve();
            }, function(response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        },

        updatePassword: function(newPasswordInf) {
            var dfd = $q.defer();
            $http.post('/api/recoverpwd', newPasswordInf).then(function(response) {
                if(response.data.success) {
                    dfd.resolve(true);
                } else {
                    dfd.resolve(false);
                }
            });
            return dfd.promise;
        },
        getRecoverData: function(id) {
        var dfd = $q.defer();
        $http.post('/api/recoverdata', {id:id}).then(function(response) {
           // alert(response.data.username)
            dfd.resolve(response.data);
        }, function(response) {
            dfd.reject(response.data.reason);
        });
        return dfd.promise;
    }

    }
});