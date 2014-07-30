angular.module('app').controller('mvEditUserCtrl', function($scope, mvUser, $filter,$routeParams, mvUserCUD,mvNotifier,mvRole,$location) {

    mvUser.query().$promise.then(function(collection) {
        collection.forEach(function(user) {
            if(user._id === $routeParams.id) {
                $scope.email=user.email;
             $scope.username=user.username;
                $scope.firstName=user.firstName;
                $scope.lastName=user.lastName;
                $scope.active=user.active;
                $scope.role=user.role;
               // $scope.activationDate=role.activationDate;

            //   $scope.activationDate=$filter('date')(new Date(role.activationDate),'yyyy-MM-dd HH:mm:ss');
             //  $scope.active=role.active;

                //date fix neaded
              $scope.user = user;
            }
        })
    });

    $scope.update=function(user){

        var newUserData ={

            username:$scope.username,
            firstName: $scope.firstName,
            lastName: $scope.lastName,
            active:$scope.active,
            role:$scope.role
        }
        var clone = angular.copy(user);
        angular.extend(clone, newUserData);


        mvUserCUD.updateUser(clone).then(function(){
            mvNotifier.notify('User has been updated');
            $location.path('/users');
        },function(reason){
            mvNotifier.error(reason);
        })
    };
    $scope.roles=mvRole.query();
});


