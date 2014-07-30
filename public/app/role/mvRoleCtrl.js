

angular.module('app').controller('mvRoleCtrl', function($scope,mvRole,mvRoleCUD,mvNotifier,$timeout){


    $scope.sortOptions = [{value:"name",text: "Sort by Name"},
        {value: "activationDate",text: "Sort by Date"}];
    $scope.sortOrder = $scope.sortOptions[0].value;

    $scope.maxSize = 5;
    $scope.bigCurrentPage = 1;
    $scope.itemsPerPage=10;
    $scope.roles = mvRole.query(function(){
        $scope.totalitems=$scope.roles.length;

    });


    $scope.add = function() {
        var newRoleData = {
            name: $scope.name,
            activationDate: new Date(),
            active: $scope.active
        };

        mvRoleCUD.createRole(newRoleData).then(function(responsedId) {
            console.log(responsedId);

            var extendId ={

                _id:responsedId
            };
            var clone = angular.copy(newRoleData);
            angular.extend(clone, extendId);

            mvNotifier.notify('New Role created!');
            $scope.roles.push(clone);
        }, function (reason) {
            mvNotifier.error(reason);
        });

    };
    $scope.delete = function(role) {

        mvRoleCUD.deleteRole(role).then(function () {
            mvNotifier.notify('Role deleted!');
            //   alert(course.title);
            $scope.roles.splice($scope.roles.indexOf(role), 1);
        }, function (reason) {
            mvNotifier.error(reason);
        })
    }
});