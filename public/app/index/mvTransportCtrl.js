angular.module('app').filter('slice', function() {
    return function(arr, start, end) {
        return arr.slice(start, end);
    };
});

angular.module('app').filter('startFrom', function() {
    return function(input, start) {
        if(input) {
            start = +start; //parse to int
            return input.slice(start);
        }
        return [];
    }
});


angular.module('app').controller('mvTransportCtrl', function(Page,$scope, $filter,mvTaking, $timeout,mvTransportCUD,mvNotifier,mvIdentity){
if(mvIdentity.currentUser!=null){
    if(!mvIdentity.currentUser.active){
        mvNotifier.warning('Palun kinnitage oma postkasti õigsust! <p> Teile oli saadetud kinnituskiri aadressile ' +mvIdentity.currentUser.email );

    }

}
    Page.setTitle(  'Võtan ');
    $scope.kuu= moment().format('dddd');
    $scope.testTransport = function() {
        var mm=Math.floor(Math.random() * 12) + 1;
        var dd=Math.floor(Math.random() * 30) + 1;
        var HH=Math.floor(Math.random() * 23) + 1;
        var MM=Math.floor(Math.random() * 59) + 1;
        var SS=Math.floor(Math.random() * 59) + 1;
        var date='2014-'+mm+'-'+dd+' '+HH+':'+MM+':'+SS+''
        mvNotifier.notify(date);
        var newTransportData = {
            username:"Vladimir Rõkovanov",
            startTime: new Date(date),
            aDirection:"Tallinn",
            bDirection:"Tõrva",
            seatPlace:mm,
            duration: Math.floor(100 + Math.random() * 900),
            transportType:"Kaubik",
            transportMark:"Ford Transit",
            transportYear:"2009"
        }

        mvTransportCUD.createTransport(newTransportData).then(function(responsedId) {
            console.log(responsedId);

            var extendId ={

                _id:responsedId
            };
            var clone = angular.copy(newTransportData);
            angular.extend(clone, extendId);

            mvNotifier.notify('New Test created!');
            $scope.transports.push(clone);
        }, function (reason) {
            mvNotifier.error(reason);
        });

    };


    var start=new Date();
    $scope.maxSize = 5;
    $scope.bigCurrentPage = 1;
    $scope.itemsPerPage=10;
    $scope.transports = mvTaking.query({time: true },function(){
        $scope.totalitems=$scope.transports.length;

    });
    $scope.predicate = '-startTime';


    $scope.test=function(muut){
        return moment(muut).format("ddd, Do MMMM YYYY HH:mm");
    }


});