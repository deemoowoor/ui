angular.module('app').factory('mvCachedRoles', function(mvRole) {
    var roleList;

    return {
        query: function() {
            if(!roleList) {
                roleList = mvRole.query();
            }
            return roleList;
        }
    }
})