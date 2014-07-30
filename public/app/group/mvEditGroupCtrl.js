angular.module('app').controller('mvEditGroupCtrl', function($scope, $location,mvGroup, $filter,$routeParams, mvGroupCUD,mvNotifier) {

    mvGroup.query().$promise.then(function(collection) {
        collection.forEach(function(group) {
            if(group._id === $routeParams.id) {
                $scope.name=group.name;
               // $scope.activationDate=role.activationDate;

               $scope.creationDate=$filter('date')(new Date(group.creationDate),'yyyy-MM-dd HH:mm:ss');
               $scope.active=group.active;

                //date fix neaded
                $scope.group = group;
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


        mvGroupCUD.updateCurrentGroup(clone).then(function(){
            mvNotifier.notify('Role has been updated');
            $location.path('/roles');
        },function(reason){
            mvNotifier.error(reason);
        })
    }

});


