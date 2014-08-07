angular.module('app').controller('mvMessageCtrl', function($scope,mvNotifier,mvMessageCUD,mvMessage,mvIdentity, $location)
{
  // $scope.messages=mvMessage.query({'recepier': mvIdentity.currentUser.username });
    $scope.messages=mvIdentity.messages;
    $scope.counti= mvIdentity.messages.isReaded.length;
    $scope.getClass = function (message) {
        return {
            unread: message.isReaded == false
        };
    };
    $scope.send = function() {
        var newMessageData = {

            type:'conversation',
            title:$scope.title,
            body:$scope.body,
            sender:mvIdentity.currentUser.username,
            recepier:$scope.recepier,
            sentDate:new Date(),
            getDate:'',
            isReaded:false,
            responses:[]
        };
        mvMessageCUD.sendMessage(newMessageData).then(function(responsedId) {
            console.log(responsedId);

            var extendId ={

                _id:responsedId
            };
            var clone = angular.copy(newMessageData);
            angular.extend(clone, extendId);

            mvNotifier.notify('Sisestatud!');

            $scope.messages.push(clone);
            $location.path('/messages');
        }, function (reason) {
            mvNotifier.error(reason);
        });
    }

});

