angular.module("app").controller("mvVertifyCtrl",function($scope, mvVertify,mvIdentity,$routeParams,$location,mvVertifyCUD,mvNotifier){





    mvVertifyCUD.getVertifyData($routeParams.id).then(function(data){
        if($routeParams.id!=null)
        {
            if(data.username!=null && !data.active){
                $scope.vertify=data;

                var newUserData ={

                    active:true
                };

                var clone = angular.copy(data);
                angular.extend(clone, newUserData);
                mvIdentity.currentUser.active=true;
                mvNotifier.notify('Mail on vertifitseeritud');
                $location.path('/');

                mvVertifyCUD.vertify(clone).then(function(){


                },function(reason){
                    mvNotifier.error(reason+''+clone._id);
                });

            }
            else{
                $location.path('/');
            }

        }





    }, function(reason) {
        mvNotifier.error(reason);

    })
});