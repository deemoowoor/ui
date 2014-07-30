angular.module('app').controller('mvEditRoleCtrl', function($scope, $location,mvCachedRoles, $filter,$routeParams, mvRoleCUD,mvNotifier) {

    mvCachedRoles.query().$promise.then(function(collection) {
        collection.forEach(function(role) {
            if(role._id === $routeParams.id) {
                $scope.name=role.name;
               // $scope.activationDate=role.activationDate;

               $scope.activationDate=$filter('date')(new Date(role.activationDate),'yyyy-MM-dd HH:mm:ss');
               $scope.active=role.active;

                //date fix neaded
                $scope.role = role;
            }
        })
    });
    $scope.update=function(role){

        var newRoleData ={

            name:$scope.name,
            activationDate: $scope.activationDate,
            active:$scope.active
        }
        var clone = angular.copy(role);
        angular.extend(clone, newRoleData);


        mvRoleCUD.updateCurrentRole(clone).then(function(){
            mvNotifier.notify('Role has been updated');
            $location.path('/roles');
        },function(reason){
            mvNotifier.error(reason);
        })
    }

});


