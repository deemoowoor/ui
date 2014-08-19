angular.module('app').controller('mvWishCtrl', function($scope,mvIdentity,mvNotifier,mvTaking,mvWish,mvWishCUD){
    $scope.takings=mvTaking.query({'registredPassengers.name': mvIdentity.currentUser.username });


    $scope.seatPlaces = ['1','2','3','4','5','6','7','8','9','10','11','12'];
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
    $scope.wishes=mvWish.query({'username': mvIdentity.currentUser.username,'deleted':false });
    $scope.info="tel:" + mvIdentity.currentUser.mobile;


    $scope.add = function() {
        var newdate=new Date($scope.year, $scope.month, $scope.day, $scope.hour, $scope.minute);

        var datenow = new Date();
        var validDate = moment($scope.year + '-' + $scope.month + '-' + $scope.day, 'YYYY-MM-DD').isValid();
        if ($scope.wishes.length > 4) {
            mvNotifier.error('Kuulutuste arv piiratud')
        }
        else {
            if (!validDate) {
                mvNotifier.error('Kalendri päeva viga!')
            }
            else if (newdate < datenow) {
                mvNotifier.error('Väljumise kuupäev peab olema suurem kui hetke aeg!')
            }
            else {
                //   mvNotifier.notify('Kuupäev on ok'); // false

                var newWishData = {

                    username: mvIdentity.currentUser.username,
                    startTime: newdate,
                    aDirection: $scope.aDirection,
                    bDirection: $scope.bDirection,
                    seats: $scope.seats,
                    package: $scope.package,
                    info: $scope.info,
                    deleted: false
                };
                mvWishCUD.createWish(newWishData).then(function (responsedId) {
                    console.log(responsedId);

                    var extendId = {

                        _id: responsedId
                    };
                    var clone = angular.copy(newWishData);
                    angular.extend(clone, extendId);

                    mvNotifier.notify('Sisestatud!');
                    $scope.wishes.push(clone);
                }, function (reason) {
                    mvNotifier.error(reason);
                });
            }
        }
        }

        $scope.forceEnd = function (taking) {


            var newTakingData = {

                canceled: true
            };

            var clone = angular.copy(taking);
            angular.extend(clone, newTakingData);


            mvWishCUD.updateWish(clone).then(function () {


                mvNotifier.notify('Lõpetatud');
                $scope.wishes = mvWish.query({'username': mvIdentity.currentUser.username, 'deleted': false});

            }, function (reason) {
                mvNotifier.error(reason);
            })
        };
        $scope.forceStart = function (taking) {

            var newTakingData = {

                canceled: false
            };

            var clone = angular.copy(taking);
            angular.extend(clone, newTakingData);


            mvWishCUD.updateWish(clone).then(function () {


                mvNotifier.notify('Taastatud');
                $scope.wishes = mvWish.query({'username': mvIdentity.currentUser.username, 'deleted': false});

            }, function (reason) {
                mvNotifier.error(reason);
            })
        };
        $scope.delete = function (taking) {

            var newTakingData = {

                deleted: true
            };

            var clone = angular.copy(taking);
            angular.extend(clone, newTakingData);


            mvWishCUD.updateWish(clone).then(function () {


                mvNotifier.notify('Kustutatud');
                $scope.wishes = mvWish.query({'username': mvIdentity.currentUser.username, 'deleted': false})

            }, function (reason) {
                mvNotifier.error(reason);
            })
        };

})