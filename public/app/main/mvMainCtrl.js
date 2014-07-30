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


angular.module('app').controller('mvMainCtrl', function($scope, $filter,mvCall, $timeout,mvCallCUD,mvNotifier){

    $scope.testCall = function() {
        var mm=Math.floor(Math.random() * 12) + 1;
        var dd=Math.floor(Math.random() * 30) + 1;
        var HH=Math.floor(Math.random() * 23) + 1;
        var MM=Math.floor(Math.random() * 59) + 1;
        var SS=Math.floor(Math.random() * 59) + 1;
        var date='2013-'+mm+'-'+dd+' '+HH+':'+MM+':'+SS+''
        mvNotifier.notify(date);
        var newCallData = {
            startTime: new Date(date),
            duration: Math.floor(100 + Math.random() * 900),
            inOut: 'in',
            aNumber: Math.floor(100000000 + Math.random() * 900000000),
            bNumber:'5108008',
            username:"Vladimir Rõkovanov",
            filename: "20140331140303_178976",
            service:'TalQms'}

        mvCallCUD.createCall(newCallData).then(function(responsedId) {
            console.log(responsedId);

            var extendId ={

                _id:responsedId
            };
            var clone = angular.copy(newCallData);
            angular.extend(clone, extendId);

            mvNotifier.notify('New Test created!');
            $scope.calls.push(clone);
        }, function (reason) {
            mvNotifier.error(reason);
        });

    };


    $(document).ready(function () {
        $("#jquery_jplayer_1").jPlayer({
            ready: function () {
                $(this).jPlayer("setMedia", {
                    oga: "http://localhost:3030/audio/20140331140303_178976.MP3"
                });
            },
            swfPath: "/js",
            supplied: "oga"
        });
    });

    $scope.maxSize = 5;
    $scope.bigCurrentPage = 1;
    $scope.itemsPerPage=10;
    $scope.calls = mvCall.query(function(){
        $scope.totalitems=$scope.calls.length;

    });

$scope.get=function(item){
    if ($scope.lastSelected) {
        $scope.lastSelected.selected = '';
    }
    this.selected = 'selected';
    $scope.lastSelected = this;
    $scope.showTitle = item;
    $("#jquery_jplayer_1").jPlayer("destroy");
    $("#jquery_jplayer_1").jPlayer({
        ready: function () {
            $(this).jPlayer("setMedia", {
                oga: "http://localhost:3030/audio/"+item+".MP3"
            });
        },
        swfPath: "/js",
        supplied: "oga"
    });
}

    $scope.play=function(item){
      //  alert("http://localhost:3030/audio/"+item+".MP3");
        $("#jquery_jplayer_1").jPlayer("destroy");
        $("#jquery_jplayer_1").jPlayer({
            ready: function () {
                $(this).jPlayer("setMedia", {
                    oga: "http://localhost:3030/audio/"+item+".MP3"
                });
            },
            swfPath: "/js",
            supplied: "oga"
        });
    }

});