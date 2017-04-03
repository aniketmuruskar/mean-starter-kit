angular.module('meanapp', ['ui.router','oc.lazyLoad', 'shared.module', 'common.module'])
        .run(run)
        .config(config);
        
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
                templateUrl: 'app/components/dashboard/dashboard.template.html',
                controller: 'DashboardController',
                resolve:{
                    load: ['$ocLazyLoad', function($ocLazyLoad){
                        $ocLazyLoad.load('ngTastyModule');
                        return $ocLazyLoad.load([
                            'app/components/dashboard/dashboard.controller.js',
                            'app/components/post/post.service.js',
                            'app/shared/directive/post/post.directive.js',
                        ]);
                    }]
                }
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
                            'app/components/post/post.service.js',
                            'app/components/post/post.controller.js'
                        ]);
                    }]
                }
            })
            .state('postdetail', {
                url: '/post/:postId',
                controller:'PostDetailController',
                templateUrl:'app/components/post-detail/postdetail.template.html',
                resolve:{
                    load: ['$ocLazyLoad', function($ocLazyLoad){
                        return $ocLazyLoad.load([
                            'app/components/post/post.service.js',
                            'app/components/post-detail/post.detail.controller.js'
                        ]);
                    }],
                    postdetail: ['Post', '$stateParams', function (Post, $stateParams) {
                        var url = '/api/posts/edit/' + $stateParams.postId;
                        console.log($stateParams.postId)
                        return Post.get(url);
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
                                'app/components/post/post.service.js',
                                'app/components/post-list/post-list.controller.js'
                            ]);
                    }]
                }
            })
            .state('profile', {
                url: '/user/profile',
                controller:'ProfileController',
                templateUrl:'app/components/profile/profile.template.html',
                resolve:{
                    load: ['$ocLazyLoad', function($ocLazyLoad){
                        return $ocLazyLoad.load([
                            'app/components/profile/profile.controller.js'
                        ]);
                    }],
                    profileData: ['data', function (data) {
                        // Return our Service call, that returns a Promise
                        return data.profile();
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
