angular.module('app').directive('fallbackSrc', function () {
    var fallbackSrc = {
        link: function postLink(scope, iElement, iAttrs) {
            iElement.bind('error', function() {
                angular.element(this).attr("src", iAttrs.fallbackSrc);
            });
        }
    }
    return fallbackSrc;
});


angular.module('app').service('uploadsService', function($http) {

    var code = '';
    var fileName = '';


    this.uploadFile = function(files) {


        var fd = new FormData();

        //Take the first selected file
        fd.append("image", files[0]);

        var promise =  $http.post('/upload', fd, {
            withCredentials: true,
            headers: {'Content-Type': undefined },
            transformRequest: angular.identity
        }).then(function(response) {

            code = response.data.code;
            fileName = response.data;


            return{
                code: function() {
                    return code;
                },
                fileName: function() {
                    return fileName;
                }
            };
        });
        return promise;
    };

});




angular.module('app').controller('mvProfileCtrl', function($scope ,mvAuth, mvIdentity, mvNotifier,uploadsService,$timeout,$location) {





    $scope.email=mvIdentity.currentUser.email;
    $scope.fname=mvIdentity.currentUser.firstName;
    $scope.lname=mvIdentity.currentUser.lastName;
    $scope.mobile=mvIdentity.currentUser.mobile;
    $scope.fileName="/avatar/"+mvIdentity.currentUser.username+".jpg";

    $scope.uploadFile = function(files) {

        uploadsService.uploadFile(files).then(function(promise){

            $scope.code = promise.code();

            $timeout(function() {
                $scope.fileName = promise.fileName();
                $scope.message ="Kui pilt ei muutunud värskendage lehte";
                mvNotifier.notify('Pilt on üles laetud! Laadige leht uuesti');

            }, 3000);


        });

    };





    $scope.update=function(){
        var newUserData ={

            email:$scope.email,
            firstName:$scope.fname,
            lastName:$scope.lname
        }
        if($scope.password && $scope.password.length>0){
            newUserData.password =$scope.password;
        }
        mvAuth.updateCurrentUser(newUserData).then(function(){
            mvNotifier.notify('Teie profiil on uendatud!');
        },function(reason){
            mvNotifier.error(reason);
        })
    }
})