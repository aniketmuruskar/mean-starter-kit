;(function () {
	'use strict';
	angular.module('common.module')
			.controller('HeaderBarController', HeaderBarController);

	/*@ngInject*/
	HeaderBarController.$inject = ['$scope', '$state', 'auth'];
	function HeaderBarController($scope, $state, auth){

		$scope.isLoggedIn = auth.isLoggedIn;
	  	$scope.currentUser = auth.currentUser;
	  	$scope.logoutUser = auth.logout;

	  	$scope.logout = function(){
	  		$scope.logoutUser();
	  		$state.go('login');
	  	};
	};
})();