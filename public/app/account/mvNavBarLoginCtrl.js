angular.module('app').controller('mvNavBarLoginCtrl',function($scope,$window, $http, mvNotifier, mvAuth,$location,mvRating,mvMessage,mvIdentity){
    $scope.identity=mvIdentity;

    $scope.messages=mvIdentity.messages;



   // console.log("identiti "+JSON.stringify(mvIdentity));


    $scope.signin=function(username,password) {
        mvAuth.authenticateUser(username, password).then(function(success){
            if(success){
                mvNotifier.notify('Sisselogimine õnnestus!');

                $location.path('/');
            }else
            {
                mvNotifier.notify('Sisselogimine ebaõnnestus!');
            }
        });
    }
    $scope.signout=function(){
        mvAuth.logoutUser().then(function(){
            $scope.username="";
            $scope.password="";
            mvNotifier.notify('Logisite välja!');
            $location.path('/');
        })
    }


});