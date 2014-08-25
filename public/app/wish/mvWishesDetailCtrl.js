angular.module("app").controller("mvWishesDetailCtrl",function($scope, mvWish,$routeParams,$window,Page){

    mvWish.query().$promise.then(function(collection) {
        collection.forEach(function(taking) {
            if(taking._id === $routeParams.id) {

                $scope.id=taking._id;
                $scope.username=taking.username;
                $scope.startTime=taking.startTime;
                $scope.aDirection=taking.aDirection;
                $scope.Direction=taking.Direction;
                $scope.seats=taking.seats;
                $scope.package=taking.package;
                $scope.canceled=taking.canceled;
                $scope.info = taking.info;
                Page.setTitle(  taking.aDirection +' - '+ taking.Direction +' '+ dateNormal(taking.startTime))
            }
        })
    });
    $scope.test=function(muut){
        return moment(muut).format("dddd, Do MMMM YYYY HH:mm");
    }
    function dateNormal(muut){
        return moment(muut).format("dddd, Do MMMM YYYY HH:mm");
    }
});