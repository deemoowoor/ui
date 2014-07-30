angular.module('app').controller('mvUserCtrl', function($scope,mvUser,mvUserCUD,mvNotifier,mvRole){

    $scope.users=mvUser.query();
    $scope.roles=mvRole.query();
    $scope.role='agent';
    $scope.sortOptions = [{value:"username",text: "Sort by Name"},
        {value: "firstName",text: "Sort by First Name"}];


    $scope.bigTotalItems = 175;
    $scope.bigCurrentPage = 1;

    $scope.signup = function() {
        var newCallData = {
            username: $scope.email,
            password: $scope.password,
            firstName: $scope.fname,
            lastName: $scope.lname,
            role:$scope.role
        };

        mvUserCUD.createUser(newUserData).then(function() {
            mvNotifier.notify('User account created!');
            $scope.users.push(newUserData);
        }, function(reason) {
            mvNotifier.error(reason);
        })
    };
    $scope.delete = function(user) {

        mvUserCUD.deleteUser(user).then(function () {
            mvNotifier.notify('User deleted!');
            //   alert(course.title);
            $scope.users.splice($scope.users.indexOf(user), 1);
        }, function (reason) {
            mvNotifier.error(reason);
        })
    }
});