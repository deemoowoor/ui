angular.module("app").controller("mvRecoverCtrl",function($scope,mvRecover,$routeParams,$location,mvRecoverCUD,mvNotifier){
$scope.idd=$routeParams.id;



        mvRecoverCUD.getRecoverData($routeParams.id).then(function(data){
            if($routeParams.id!=null)
            {
                if(data.username!=null&&data.active){
                    $scope.username=data.username;

                }
                else{
                    $location.path('/recover')
                }

            }





    }, function(reason) {
        mvNotifier.error(reason);

    })



    $scope.send = function() {

        var recoverEmail = {
            email: $scope.email,
            recoverDate: new Date()
        };


        mvRecoverCUD.recoverEmail(recoverEmail).then(function() {

            mvNotifier.notify('Mail on saadetud juhul kui tegemist õige mailiga');

        }, function(reason) {
            mvNotifier.error(reason);

    })
    };

    $scope.update = function() {

        var recoverPwd = {
            password: $scope.password,
            username: $scope.username
        };


        mvRecoverCUD.updatePassword(recoverPwd).then(function() {
            mvNotifier.notify('parool on muudetud');
            $location.path('/login')
        },function(reason){
            mvNotifier.error(reason);
        })
    }


});