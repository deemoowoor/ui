angular.module('app', ['ngResource', 'ngRoute','ui.bootstrap']);

angular.module('app').config(function($routeProvider, $locationProvider) {
    var routeRoleChecks = {
        admin: {auth: function(mvAuth) {
            return mvAuth.authorizeCurrentUserForRoute('admin')
        }},
        user: {auth: function(mvAuth) {
            return mvAuth.authorizeAuthenticatedUserForRoute()
        }}
    }

    $locationProvider.html5Mode(true);
    $routeProvider
        .when('/', { templateUrl: '/partials/index/index', controller: 'mvTransportCtrl',activetab: 'dashboard'})
        //.when('/', { templateUrl: '/partials/main/main', controller: 'mvMainCtrl',activetab: 'dashboard'})
        .when('/wish', { templateUrl: '/partials/wish/wish',
            controller: 'mvWishCtrl', resolve: routeRoleChecks.user
        })
        .when('/wishes', { templateUrl: '/partials/wish/wishes',
            controller: 'mvWishesCtrl'
        })
        .when('/wishes/:id', { templateUrl: '/partials/wish/wishes-detail',
            controller: 'mvWishesDetailCtrl'})

        .when('/taking', { templateUrl: '/partials/taking/taking',
            controller: 'mvTakingCtrl', resolve: routeRoleChecks.user
        })
        .when('/!/taking/:id', { templateUrl: '/partials/taking/taking-detail',
            controller: 'mvTakingDetailCtrl'})
        .when('/taking/edit/:id', { templateUrl: '/partials/taking/edit-taking',
            controller: 'mvTakingDetailCtrl'})
        .when('/messages', { templateUrl: '/partials/message/message',
            controller: 'mvMessageCtrl'
        })
        .when('/messages/newmessage', { templateUrl: '/partials/message/newmessage',
            controller: 'mvMessageCtrl'
        })
        .when('/messages/view-message/:id', { templateUrl: '/partials/message/view-message',
            controller: 'mvViewMessage'
        })

        .when('/users', { templateUrl: '/partials/user/user',
            controller: 'mvUserCtrl'
        })
        .when('/users/edit-user/:id', { templateUrl: '/partials/user/edit-user',
            controller: 'mvEditUserCtrl'})
        .when('/roles', { templateUrl: '/partials/role/role',
            controller: 'mvRoleCtrl'
        })
        .when('/roles/edit-role/:id', { templateUrl: '/partials/role/edit-role',
            controller: 'mvEditRoleCtrl'
        })
        .when('/groups', { templateUrl: '/partials/group/group',
            controller: 'mvGroupCtrl'
        })
        .when('/groups/edit-group/:id', { templateUrl: '/partials/group/edit-group',
            controller: 'mvEditGroupCtrl'
        })
        .when('/signup', { templateUrl: '/partials/account/signup',
            controller: 'mvSignupCtrl'
        })
        .when('/profile', { templateUrl: '/partials/account/profile',
            controller: 'mvProfileCtrl', resolve: routeRoleChecks.user
        })
        .when('/custom', { templateUrl: '/partials/courses/course-list',
            controller: 'mvCourseListCtrl'
        })
        .when('/custom/:id', { templateUrl: '/partials/courses/course-details',
            controller: 'mvCourseDetailCtrl'
        })
        .when('/login', { templateUrl: '/partials/account/login',
            controller: 'mvNavBarLoginCtrl'
        })

        .when('/rating/:name/:id', { templateUrl: '/partials/account/rate/rating',
            controller: 'mvRatingCtrl', resolve: routeRoleChecks.user
        })
        .when('/rating/:name', { templateUrl: '/partials/account/rate/rating',
            controller: 'mvRatingCtrl'
        })
        .when('/contact', { templateUrl: '/partials/contact/contact',
            controller: 'mvContactCtrl'
        })
        .when('/vertify/:id', { templateUrl: '/partials/account/vertify',
            controller: 'mvVertifyCtrl'
        })
        .when('/recover', { templateUrl: '/partials/account/recover',
            controller: 'mvRecoverCtrl'
        })
        .when('/recover/:id', { templateUrl: '/partials/account/recover-page',
            controller: 'mvRecoverCtrl'
        })

        .when('/rate/:id', { templateUrl: '/partials/account/rate/rate',
            controller: 'mvRateCtrl'
        })


});

angular.module('app').run(function($rootScope, $location,mvNotifier) {
    $rootScope.$on('$routeChangeError', function(evt, current, previous, rejection) {
        if(rejection === 'not authorized') {
            $location.path('/login');
            mvNotifier.notify('Pead olema sisselogitud');
        }
    })
})