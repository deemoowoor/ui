
angular.module('app').controller('mvTakingCtrl', function($scope,mvIdentity,mvNotifier,mvTakingCUD,mvTaking,Page)
{

    var username="";
    if(mvIdentity.currentUser!=null){
        username=mvIdentity.currentUser.username;
    }
 $scope.mydate=moment().format("DD");
    $scope.takings=mvTaking.query({'username': username,'deleted':false });
    $scope.seatPlaces = ['0','1','2','3','4','5','6','7','8','9','10','11','12'];
    $scope.seatPlace='1';
    $scope.days = ['01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31'];
    $scope.day=moment().format("DD");
    $scope.months = ['01','02','03','04','05','06','07','08','09','10','11','12'];
    $scope.month=moment().format("MM");

    $scope.years = ['2014','2015'];
    $scope.year=moment().format("YYYY");
    $scope.hours = ['00','01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23'];
    $scope.hour=moment().add(1, 'hour').format("HH");
    $scope.minutes = ['00','05','10','15','20','25','30','35','40','45','50','55'];
    $scope.minute='00';
    //$scope.info="tel:" + mvIdentity.currentUser.mobile;
    Page.setTitle(  'Võtan');

    $scope.check = function() {

        var newdate=moment($scope.year+"-"+$scope.month+"-"+$scope.day+" "+$scope.hour+":"+$scope.minute, "YYYY-MM-DD HH:mm");
        var datenow= moment();
        var validDate=moment($scope.year+'-'+$scope.month+'-'+$scope.day,'YYYY-MM-DD').isValid()
        if(!validDate)
        {
            mvNotifier.error('Kalendri päeva viga!')
        }
        else if(newdate<datenow){
            mvNotifier.error('Väljumise kuupäev peab olema suurem kui hetke aeg!')
        }
        else{
            mvNotifier.notify('Kuupäev on ok'); // false

        }

    };
    $scope.forceEnd=function(taking){

        var newTakingData ={

            canceled:true
        };

        var clone = angular.copy(taking);
        angular.extend(clone, newTakingData);


        mvTakingCUD.updateTaking(clone).then(function(){


            mvNotifier.notify('Lõpetatud');
            $scope.takings=mvTaking.query({'username': username,'deleted':false });

        },function(reason){
            mvNotifier.error(reason);
        })
    };
    $scope.forceStart = function(taking){

        var newTakingData ={

            canceled:false
        };

        var clone = angular.copy(taking);
        angular.extend(clone, newTakingData);


        mvTakingCUD.updateTaking(clone).then(function(){


            mvNotifier.notify('Taastatud');
            $scope.takings=mvTaking.query({'username': username,'deleted':false });

        },function(reason){
            mvNotifier.error(reason);
        })
    };
    $scope.delete = function(taking){

        var newTakingData ={

            deleted:true
        };

        var clone = angular.copy(taking);
        angular.extend(clone, newTakingData);


        mvTakingCUD.updateTaking(clone).then(function(){


            mvNotifier.notify('Kustutatud');
            $scope.takings=mvTaking.query({'username': username,'deleted':false });

        },function(reason){
            mvNotifier.error(reason);
        })
    };
    $scope.add = function() {

        var newdate=moment($scope.year+"-"+$scope.month+"-"+$scope.day+" "+$scope.hour+":"+$scope.minute, "YYYY-MM-DD HH:mm");

        var datenow= moment();
        var validDate=moment($scope.year+'-'+$scope.month+'-'+$scope.day,'YYYY-MM-DD').isValid()
        if( $scope.takings.length>4){
            mvNotifier.error('Kuulutuste arv piiratud')
        }
        else
        {

        if(!validDate)
        {
            mvNotifier.error('Kalendri päeva viga!')
        }
        else if(newdate<datenow){
            mvNotifier.error('Väljumise kuupäev peab olema suurem kui hetke aeg!')
        }
        else{
         //   mvNotifier.notify('Kuupäev on ok'); // false

            var newTakingData = {

                username: username,
                startTime:newdate,
                aDirection:$scope.aDirection,
                Direction:$scope.Direction,
                seatPlace:$scope.seatPlace,
                seatCount:$scope.seatPlace,
                mobile:mvIdentity.currentUser.mobile,
                price:$scope.price,
             //   postWeight:$scope.postWeight,
           //     postLenght:$scope.postLenght,
             //   postWidth:$scope.postWidth,
               // postHight:$scope.postHight,
                duration:$scope.duration,
                info:$scope.info,
                deleted:false,
                package: $scope.package
              //  transportType:'Kaubik',
                //transportMark:'Ford Transit',
                //transportYear:'1983'
            };
            mvTakingCUD.createTaking(newTakingData).then(function(responsedId) {
                console.log(responsedId);

                var extendId ={

                    _id:responsedId
                };
                var clone = angular.copy(newTakingData);
                angular.extend(clone, extendId);

                mvNotifier.notify('Sisestatud!');
                $scope.takings=mvTaking.query({'username': username,'deleted':false });
            }, function (reason) {
                mvNotifier.error(reason);
            });
        }
        }
    }

});

