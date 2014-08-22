angular.module("app").controller("mvTakingDetailCtrl",function($scope,Page, mvTaking,$routeParams,mvIdentity,mvTakingCUD,mvNotifier,mvMessageCUD,$location){
var username="";
    if(mvIdentity.currentUser!=null){
       username= mvIdentity.currentUser.username;

    }
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

                Page.setTitle(  taking.aDirection +' - '+ taking.bDirection +' '+ dateNormal(taking.startTime))

            }
        })
    });
    function dateNormal(muut){
        return moment(muut).format("dddd, Do MMMM YYYY HH:mm");
    }
    $scope.test=function(muut){
        return moment(muut).format("dddd, Do MMMM YYYY HH:mm");
    }
    $scope.isOwnerOrFull=function(){
        if(username===$scope.username||username===""){
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
    $scope.isPassenger=function(name,canceled,canceled2){
        if(mvIdentity.currentUser.username===name && !canceled && !canceled2){
            return true
        }
        return false
    };

    $scope.ifOwner=function(istrue,name){
        if(mvIdentity.currentUser.username===name || istrue){
            return true
        }
        return false
    }
    $scope.isOwner=function(name,canceled,canceled2){
        if(mvIdentity.currentUser.username===name && !canceled && !canceled2){
            return true
        }
        return false
    };

    $scope.canceledByOwner=function(id){

        var updateTakingData = {
            _id:id,
            canceled:true,
            seatCount: parseInt($scope.seatCount)+1
        };
        mvTakingCUD.canceledByOwner(updateTakingData).then(function(responsedId) {
            mvNotifier.notify('Tühistatud');
            $scope.seatCount=parseInt($scope.seatCount)+1
            $location.path('/');
        }, function (reason) {
            mvNotifier.error(reason);
        });
    };

    $scope.canceledByPassenger=function(id){

        var updateTakingData = {
            _id:id,
            canceled:true,
            seatCount: parseInt($scope.seatCount)+1
        };
        mvTakingCUD.canceledByPassenger(updateTakingData).then(function(responsedId) {
            mvNotifier.notify('Tühistatud');
            $scope.seatCount=parseInt($scope.seatCount)+1
            $location.path('/');
        }, function (reason) {
            mvNotifier.error(reason);
        });
    };


    $scope.update=function(taking){
        $scope.registredPassengers.push({name: mvIdentity.currentUser.username, date:new Date(),rated:false,ratedByPassaneger:false})
        var newTakingData ={

            seatCount: $scope.seatCount-1,
            registredPassengers: $scope.registredPassengers
        };

        var clone = angular.copy(taking);
        angular.extend(clone, newTakingData);


        mvTakingCUD.updateTaking(clone).then(function(res){
            console.log('vastus' +JSON.stringify(res))
            if(res.reason)
            {
                console.log(res.reason)
                mvNotifier.error('Eelnevalt tühistatud ei sa resveerida');

                $location.path('/');
            }
            else{


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
            $location.path('/'); }
        },function(reason){
            mvNotifier.error(reason);
        })
    };
});