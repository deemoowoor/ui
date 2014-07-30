angular.module('app').controller('mvViewMessage', function($scope, mvMessage, $filter,$routeParams) {

    mvMessage.query().$promise.then(function (collection) {
        collection.forEach(function (message) {
            if (message._id === $routeParams.id) {
                $scope.message = message;
                $scope.dateFormated=moment(message.sentDate).calendar();
            }
        })
    });
});
