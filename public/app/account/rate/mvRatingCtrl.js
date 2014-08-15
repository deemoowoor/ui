angular.module('app').controller('mvRatingCtrl', function($scope, mvRating,mvTaking,mvIdentity,$routeParams,mvRatingCUD,mvTakingCUD,mvNotifier) {

//{_id:$routeParams.id, registredPassengers: [{name:$routeParams.name}]} {registredPassengers: [{_id:$routeParams.id}]}
    $scope.taking=mvTaking.query({'registredPassengers._id':$routeParams.id});
    $scope.user=$routeParams.name;
    $scope.ratings=mvRating.query({ratedUsername: $routeParams.name});
    $scope.myid=$routeParams.id;
    $scope.checked=function(id){

    }
    $scope.add = function(vars) {

        var rating
        if(vars==null||vars=='has-success')
            var rating=1;
        if(vars=="has-warning")
            var rating=0;
        if(vars=="has-error")
            var rating=-1;



        var newCommentData = {
            takingRegistredPassengerId:$routeParams.id,
            username:mvIdentity.currentUser.username,
            ratedUsername:$routeParams.name,
            ratedDate:new Date(),
            rating:rating,
            comment:$scope.comment
        };

        var updateTakingData = {
            _id:$routeParams.id,
            rated:true
        };

        mvTakingCUD.setRatedToTrue(updateTakingData).then(function(responsedId) {

        }, function (reason) {
            mvNotifier.error(reason);
        });

        mvRatingCUD.addNewComment(newCommentData).then(function(responsedId) {
            console.log(responsedId);

            var extendId ={

                _id:responsedId
            };
            var clone = angular.copy(newCommentData);
            angular.extend(clone, extendId);

            mvNotifier.notify('Lisatud!');
            $scope.ratings.push(clone);
        }, function (reason) {
            mvNotifier.error(reason);
        });
    }

    $scope.getClass = function (mvRating) {
        if($routeParams.id===mvRating.takingRegistredPassengerId)
        {
            $scope.visor=true
        }

        return {

            "fa fa-smile-o": mvRating.rating == 1,
            "fa fa-frown-o": mvRating.rating == -1,
            "fa fa-meh-o": mvRating.rating == 0
        };
    };
    $scope.getClassLabel = function (mvRating) {
        return {
            "label label-success": mvRating.rating == 1,
            "label label-danger": mvRating.rating == -1,
            "label label-warning": mvRating.rating == 0
        };
    };
    $scope.predicate = '-ratedDate';





});

