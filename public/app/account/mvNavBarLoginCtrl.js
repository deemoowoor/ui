angular.module('app').controller('mvNavBarLoginCtrl',function($scope,$window, $http, mvNotifier, mvAuth,$location,mvMessage,mvIdentity){
    $scope.identity=mvIdentity;
console.log(mvIdentity);
    if(mvIdentity.isAuthenticated())
    {  console.log($scope.identity.currentUser.username);
        $scope.messages=mvMessage.query({'recepier': $scope.identity.currentUser.username });
          }
    else
    {
        console.log('jah');
       // $scope.messages=mvMessage.query({'recepier': $scope.identity.currentUser.username });

    }


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