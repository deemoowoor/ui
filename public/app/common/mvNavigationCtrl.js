angular.module('app')
    .controller('NavigationCtrl', ['$scope', '$location', function ($scope, $location) {
        $scope.isActive = function (path) {
            return $location.path() == path;

        };
    }]);