angular.module('app').controller('mvSignupCtrl', function($scope, mvUser, mvNotifier, $location, mvAuth) {

    $scope.signup = function() {
        var newUserData = {
            email: $scope.email,
            username: $scope.username,
            password: $scope.password,
            firstName: $scope.fname,
            lastName: $scope.lname,
            mobile: $scope.mobile
        };

        mvAuth.createUser(newUserData).then(function() {
            mvNotifier.notify('Kasutaja loodud!');
            $location.path('/');
        }, function(reason) {
            mvNotifier.error(reason);
        })
    }
})