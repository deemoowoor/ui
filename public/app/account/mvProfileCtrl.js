angular.module('app').controller('mvProfileCtrl', function($scope, mvAuth, mvIdentity, mvNotifier) {

    $scope.email=mvIdentity.currentUser.email;
    $scope.fname=mvIdentity.currentUser.firstName;
    $scope.lname=mvIdentity.currentUser.lastName;
    $scope.mobile=mvIdentity.currentUser.mobile;

    $scope.update=function(){
        var newUserData ={

            email:$scope.email,
            firstName:$scope.fname,
            lastName:$scope.lname
        }
        if($scope.password && $scope.password.length>0){
            newUserData.password =$scope.password;
        }
        mvAuth.updateCurrentUser(newUserData).then(function(){
            mvNotifier.notify('Your user account ha been updated');
        },function(reason){
            mvNotifier.error(reason);
        })
    }
})