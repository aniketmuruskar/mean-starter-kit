;(function () {
    'use strict';
    angular.module('meanapp')
    		.controller('RegisterController', RegisterController);

    /*@ngInject*/
    RegisterController.$inject = ['$scope', '$http', '$state', 'auth'];
    function RegisterController($scope, $http, $state, auth){

    	$scope.user = {};

    	$scope.register = function(){

            $scope.loading = true

            auth.register($scope.user).error(function(error){
               $scope.error = error;
               $scope.loading = false;
               alert('Sorry!, there is an error. Please try again');
            }).then(function(){
               $scope.loading = false;
               $state.go('login');
            });
    	};
    };
})();