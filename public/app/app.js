angular.module('meanapp', ['ui.router','oc.lazyLoad', 'shared.module', 'common.module'])
        .run(run)
        .config(config)
        .factory('myHttpInterceptor', myHttpInterceptor);
        


/*@ngInject*/
config.$inject = ['$compileProvider', '$httpProvider', '$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider'];
function config($compileProvider, $httpProvider, $stateProvider, $urlRouterProvider, $ocLazyLoadProvider) {
    "ngInject";
    
    $httpProvider.interceptors.push('myHttpInterceptor');
    $compileProvider.debugInfoEnabled(true);

    $ocLazyLoadProvider.config({
        debug: true,
        modules: [{
            name: 'ngTastyModule',
            files: ['/static/assets/ng-tasty/ng-tasty-tpls.min.js']
        }]
    });

    $urlRouterProvider.otherwise('/');

    $stateProvider
            .state('home', {
                url: '/',
                template: '<h1>Dashboard</h1>',
            })
            .state('login', {
                url: '/auth/sign-in',
                controller:'LoginController',
                templateUrl:'app/components/login/login.template.html',
                resolve:{
                    load: ['$ocLazyLoad', function($ocLazyLoad){
                        return $ocLazyLoad.load([
                                'app/components/login/login.controller.js'
                            ]);
                    }]
                }
            })
            .state('signup', {
                url: '/auth/sign-up',
                controller:'RegisterController',
                templateUrl:'app/components/signup/register.template.html',
                resolve:{
                    load: ['$ocLazyLoad', function($ocLazyLoad){
                        return $ocLazyLoad.load([
                                'app/components/signup/register.controller.js'
                            ]);
                    }]
                }
            })
            .state('addpost', {
                url: '/add-your-post',
                controller:'PostController',
                templateUrl:'app/components/post/addpost.template.html',
                resolve:{
                    load: ['$ocLazyLoad', function($ocLazyLoad){
                        return $ocLazyLoad.load([
                                'app/components/post/post.controller.js'
                            ]);
                    }]
                }
            })
            .state('postlist', {
                url: '/post-listing',
                controller:'PostListController',
                templateUrl:'app/components/post-list/post-list.template.html',
                resolve:{
                    load: ['$ocLazyLoad', function($ocLazyLoad){
                        $ocLazyLoad.load('ngTastyModule');
                        return $ocLazyLoad.load([
                                'app/components/post-list/post-list.controller.js'
                            ]);
                    }]
                }
            })
            .state('aboutus', {
                url: '/about-us',
                template: '<h1>About us</h1>',
            })
            .state('contactus', {
                url: '/contact-us',
                template: '<h1>Contact us</h1>',
            })
};

/*@ngInject*/
run.$inject = ['$rootScope', '$state'];
function run($rootScope, $state){
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
        console.log('from:' + fromState.name + ' to:' +toState.name);
    });
};

/*@ngInject*/
myHttpInterceptor.$inject = ['$q'];
function myHttpInterceptor($q){
    return {
        request: function(config) {
            return config;
        },

        responseError: function (response) {
            alert("Please login again.");
            if (response.status === 401) {
               window.location.href = "http://localhost:8886/#/auth/sign-in";
            }
            if (response.status == 403) {
                alert("Permission denied.");
            }
            if (response.status == 400) {
                alert("Exception occured. Bad request.");
            }
            return $q.reject(response);
        }
    };
};
