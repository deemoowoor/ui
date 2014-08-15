angular.module('app').factory('mvVertifyCUD', function($http, mvIdentity, $q) {
    return {
        vertify: function(newPasswordInf) {
            var dfd = $q.defer();
            $http.post('/api/vertify', newPasswordInf).then(function(response) {
                if(response.data.success) {
                    dfd.resolve(true);
                } else {
                    dfd.resolve(false);
                }
            });
            return dfd.promise;
        },
        getVertifyData: function(id) {
            var dfd = $q.defer();
            $http.post('/api/vertifydata', {id:id}).then(function(response) {
                // alert(response.data.username)
                dfd.resolve(response.data);
            }, function(response) {
                dfd.reject(response.data.reason);
            });
            return dfd.promise;
        }

    }
});