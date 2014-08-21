angular.module('app').controller('mvWishesCtrl', function($scope,mvIdentity,mvNotifier,mvTaking,mvWish,mvWishCUD,Page){
    Page.setTitle(  'Soovin');
    $scope.maxSize = 5;
    $scope.bigCurrentPage = 1;
    $scope.itemsPerPage=10;
    $scope.transports = mvWish.query({time: true },function(){
        $scope.totalitems=$scope.transports.length;

    });
    $scope.predicate = '-startTime';

    $scope.test=function(muut){
        return moment(muut).format("ddd, Do MMMM YYYY HH:mm");
    }

})