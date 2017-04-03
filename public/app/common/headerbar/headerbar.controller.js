;(function () {
	'use strict';
	angular.module('common.module')
			.controller('HeaderBarController', HeaderBarController);

	/*@ngInject*/
	HeaderBarController.$inject = ['$scope', '$state', 'jwt'];
	function HeaderBarController($scope, $state, jwt) {

		$scope.isLoggedIn = jwt.isLoggedIn;
	  	$scope.currentUser = jwt.currentUser;
	  	$scope.logoutUser = jwt.logout;

	  	$scope.logout = function() {
	  		$scope.logoutUser();
	  		$state.go('login');
	  	};
	};
})();
