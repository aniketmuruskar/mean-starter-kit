;(function () {
    'use strict';
    angular.module('meanapp')
    	.controller('DashboardController', DashboardController);

    /*@ngInject*/
    DashboardController.$inject = ['$scope', '$http', '$state'];
    function DashboardController($scope, $http, $state){

    	$scope.title = "Creating Directive";
    	$scope.footer = "Footer usign transclude option set to true";
    	$scope.post = {
    		author:'Aniket Muruskar',
    		title:'Creating Directives',
    		description: "Directives are markers on a DOM element (such as an attribute, element name, comment or CSS class) that tell AngularJS's HTML compiler ($compile) to attach a specified behavior to that DOM element"
    	};
    };
})();