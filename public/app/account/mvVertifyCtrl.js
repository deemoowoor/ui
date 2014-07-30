angular.module("app").controller("mvVertifyCtrl",function($scope, mvVertify,$routeParams,$location,mvVertifyCUD,mvNotifier){
    mvVertify.query().$promise.then(function(collection) {
        collection.forEach(function(user) {
            if(user._id === $routeParams.id) {

                if(user.active){
                $location.path('/');
                }else{
                    $scope.username=user.username;

                    var newUserData ={

                        active:true
                    };

                    var clone = angular.copy(user);
                    angular.extend(clone, newUserData);


                    mvVertifyCUD.vertify(clone).then(function(){
                        mvNotifier.notify('Mail on vertifitseeritud');
                           $location.path('/login');
                    },function(reason){
                        mvNotifier.error(reason+''+clone._id);
                    });

                };


            }
        })
    });
});