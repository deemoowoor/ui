angular.module("app").controller("mvTakingDetailCtrl",function($scope, mvTaking,$routeParams,mvIdentity,mvTakingCUD,mvNotifier,mvMessageCUD,$location){
    mvTaking.query().$promise.then(function(collection) {
        collection.forEach(function(taking) {
            if(taking._id === $routeParams.id) {
                $scope.username=taking.username;
                $scope.startTime=taking.startTime;
                $scope.aDirection=taking.aDirection;
                $scope.bDirection=taking.bDirection;
                $scope.seatPlace=taking.seatPlace;
                $scope.registredPassengers =taking.registredPassengers;
                $scope.info = taking.info;
                $scope.taking = taking;

            }
        })
    });
    $scope.update=function(taking){
        $scope.registredPassengers.push({name: mvIdentity.currentUser.username, date:new Date()})
        var newTakingData ={

            seatPlace: $scope.seatPlace-1,
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
                isReaded:false,
                responses:[]
            };

            mvMessageCUD.sendMessage(newMessageData).then(function(responsedId) {
                console.log(responsedId);

            }, function (reason) {
                mvNotifier.error(reason);
            });

            mvNotifier.notify('Reserveritud');
            //$location.path('/');
        },function(reason){
            mvNotifier.error(reason);
        })
    };
});