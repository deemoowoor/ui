angular.module("app").controller("mvTakingDetailCtrl",function($scope, mvTaking,$routeParams,mvIdentity,mvTakingCUD,mvNotifier,mvMessageCUD,$location){

    mvTaking.query().$promise.then(function(collection) {
        collection.forEach(function(taking) {
            if(taking._id === $routeParams.id) {

                $scope.id=taking._id;
                $scope.username=taking.username;
                $scope.startTime=taking.startTime;
                $scope.aDirection=taking.aDirection;
                $scope.bDirection=taking.bDirection;
                $scope.seatPlace=taking.seatPlace;
                $scope.seatCount=taking.seatCount;
                $scope.free=taking.seatPlace-taking.registredPassengers.length;
                $scope.registredPassengers =taking.registredPassengers;
                $scope.canceled=taking.canceled;
                $scope.info = taking.info;
                $scope.taking = taking;


            }
        })
    });
    $scope.isOwnerOrFull=function(){
        if(mvIdentity.currentUser.username===$scope.username){
            return true
        }

        if( 0 ==  $scope.seatCount ){
            return true
        }
        if( $scope.canceled ){
            return true
        }
        return false
    };
    $scope.isOwner=function(name,canceled){
        if(mvIdentity.currentUser.username===name && !canceled){
            return true
        }
        return false
    };

    $scope.cancel=function(id){

        var updateTakingData = {
            _id:id,
            canceled:true,
            seatCount: parseInt($scope.seatCount)+1
        };
        mvTakingCUD.cancel(updateTakingData).then(function(responsedId) {
            mvNotifier.notify('Tühistatud');
            $scope.seatCount=parseInt($scope.seatCount)+1
            $location.path('/');
        }, function (reason) {
            mvNotifier.error(reason);
        });
    };


    $scope.update=function(taking){
        $scope.registredPassengers.push({name: mvIdentity.currentUser.username, date:new Date(),rated:false})
        var newTakingData ={

            seatCount: $scope.seatCount-1,
            registredPassengers: $scope.registredPassengers
        };

        var clone = angular.copy(taking);
        angular.extend(clone, newTakingData);


        mvTakingCUD.updateTaking(clone).then(function(){

            var newMessageData = {

                type:'conversation',
                title:'Registreerus peale',
                body:'Kontakt telefon: '+mvIdentity.currentUser.mobile ,
                sender:mvIdentity.currentUser.username,
                recepier:taking.username,
                sentDate:new Date(),
                getDate:'',
                isReaded:true,
                responses:[],
                deleted:false,
                package: $scope.package
            };

            mvMessageCUD.sendMessage(newMessageData).then(function(responsedId) {
                console.log(responsedId);

            }, function (reason) {
                mvNotifier.error(reason);
            });

            mvNotifier.notify('Reserveritud');
            $scope.free=$scope.free-1;
            $location.path('/');
        },function(reason){
            mvNotifier.error(reason);
        })
    };
});