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




angular.module('app').controller('mvProfileCtrl', function($scope, mvAuth, mvIdentity, mvNotifier,uploadsService,$timeout) {





    $scope.email=mvIdentity.currentUser.email;
    $scope.fname=mvIdentity.currentUser.firstName;
    $scope.lname=mvIdentity.currentUser.lastName;
    $scope.mobile=mvIdentity.currentUser.mobile;


    $scope.uploadFile = function(files) {

        uploadsService.uploadFile(files).then(function(promise){

            $scope.code = promise.code();

            $timeout(function() {
                $scope.fileName = promise.fileName();
                $scope.result='Mellow Yellow';
                console.log('update with timeout fired')
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
            mvNotifier.notify('Your user account ha been updated');
        },function(reason){
            mvNotifier.error(reason);
        })
    }
})