angular.module("app").controller("mvWishesDetailCtrl",function($scope, mvWish,$routeParams,mvIdentity,mvTakingCUD,mvNotifier,mvMessageCUD,$location){

    mvWish.query().$promise.then(function(collection) {
        collection.forEach(function(taking) {
            if(taking._id === $routeParams.id) {

                $scope.id=taking._id;
                $scope.username=taking.username;
                $scope.startTime=taking.startTime;
                $scope.aDirection=taking.aDirection;
                $scope.bDirection=taking.bDirection;
                $scope.canceled=taking.canceled;
                $scope.info = taking.info;

            }
        })
    });

});