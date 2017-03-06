angular.module('meanapp', ['ui.router', 'oc.lazyLoad'])
        .config(config);


config.$inject = ['$stateProvider', '$urlRouterProvider'];

function config($stateProvider, $urlRouterProvider) {
    "ngInject";

    $urlRouterProvider.otherwise('/post-listing');

    $stateProvider
            .state('home', {
                url: '/',
                template: '<h1>Dashboard</h1>',
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
}