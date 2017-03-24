;(function () {
    'use strict';
    angular.module('meanapp')
    	.controller('DashboardController', DashboardController);

    /*@ngInject*/
    DashboardController.$inject = ['$scope', '$http', '$state'];
    function DashboardController($scope, $http, $state){
    };
})();