angular.module('meanapp', ['ui.router','oc.lazyLoad'])
        .config(config);


config.$inject = ['$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider'];

function config($stateProvider, $urlRouterProvider, $ocLazyLoadProvider) {
    "ngInject";

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
            .state('addpost', {
                url: '/add-your-post',
                templateUrl: 'app/components/post/addpost.template.html',
                controller: function($scope, $http, $state) {
                    
                    $scope.post = {
                        title: '',
                        author: '',
                        description: '',
                        status: 0
                    };

                    $scope.loading = false;

                    $scope.createPost = function(){

                        $scope.loading = true;

                        $http.post('/api/createpost', $scope.post)
                            .then(function success(response) {
                                $scope.loading = false;
                                $scope.post = {};
                                $state.go("myposts");
                            }, function error(response){
                                $scope.loading = false;
                                alert('Sorry!, there is an error. Please try again');
                        });
                    };
                }
            })
            .state('myposts', {
                url: '/post-listing',
                templateUrl: 'app/components/post/myposts.template.html',
                controller: function($scope, $http, $state, $ocLazyLoad) {

                    $ocLazyLoad.load('ngTastyModule'); // will load the ngTastyModule

                    $scope.myposts = [];
                    $scope.loading = true;

                    $http.get('/api/myposts-list')
                        .then(function success(response) {

                            $scope.myposts = response.data;
                            $scope.loading = false;

                        }, function error(response){
                            $scope.loading = false;
                            alert('Sorry!, there is an error. Please try again');
                    });
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