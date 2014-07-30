angular.module('app').controller('mvGroupCtrl', function($scope,mvGroup,mvNotifier,mvGroupCUD){
    $scope.groups=mvGroup.query();
    $scope.add = function() {
        var newGroupData = {
            name: $scope.name,
            creationDate: new Date(),
            active: $scope.active
        };

        mvGroupCUD.createGroup(newGroupData).then(function(responsedId) {
            console.log(responsedId);

            var extendId ={

                _id:responsedId,
                members:[]
            };
            var clone = angular.copy(newGroupData);
            angular.extend(clone, extendId);

            mvNotifier.notify('New Group created!');
            $scope.groups.push(clone);
        }, function (reason) {
            mvNotifier.error(reason);
        });

    };
});