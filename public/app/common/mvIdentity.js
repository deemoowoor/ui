angular.module('app').factory('mvIdentity', function($window, mvUser,mvMessage) {
    var messages=[];
    var currentUser;

  //  console.log("messages "+JSON.stringify(messages));
    if(!!$window.bootstrappedUserObject) {
        currentUser = new mvUser();
        angular.extend(currentUser, $window.bootstrappedUserObject);
        messages=mvMessage.query({'recepier':currentUser.username,'isReaded':false});


    }
    return {
        messages: messages,
        currentUser: currentUser,
        isAuthenticated: function() {
            return !!this.currentUser;
        },
        isOwner: function(user) {
            if(currentUser.username===user){
              return true;
            }
            return false;
        },
        isAuthorized: function(role) {
            return !!this.currentUser && this.currentUser.roles.indexOf(role) > -1;
        }
    }
})