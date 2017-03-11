;(function () {
    'use strict';
    angular.module('meanapp')
    	.controller('LoginController', LoginController);

    /*@ngInject*/
    LoginController.$inject = ['$scope', '$http', '$state', 'auth'];
    function LoginController($scope, $http, $state, auth){

    	$scope.user = {};

    	$scope.authenticate = function(){

            $scope.loading = true;

            auth.login($scope.user).then(function(response){
                $scope.loading = false;
                $state.go('postlist');
            }, function(error){
                $scope.error = error.data;
                $scope.loading = false;
                alert('Sorry!, there is an error. Please try again');
            });
    	};
    };
})();