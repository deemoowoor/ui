angular.module('app').controller('mvNavBarLoginCtrl',function($scope,$window, $http, mvNotifier, mvAuth,$location,mvRating,mvMessage,mvIdentity){
    $scope.identity=mvIdentity;

    $scope.messages=mvIdentity.messages;



    console.log("identiti "+JSON.stringify(mvIdentity));


    $scope.signin=function(username,password) {
        mvAuth.authenticateUser(username, password).then(function(success){
            if(success){
                mvNotifier.notify('You have successfully signed in!');

                $location.path('/');
            }else
            {
                mvNotifier.notify('You failed to login');
            }
        });
    }
    $scope.signout=function(){
        mvAuth.logoutUser().then(function(){
            $scope.username="";
            $scope.password="";
            mvNotifier.notify('You have successfully signed out');
            $location.path('/');
        })
    }


});