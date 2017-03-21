;(function () {
	'use strict';
	angular.module('meanapp')
			.controller('ProfileController', ProfileController);

	/*@ngInject*/
	ProfileController.$inject = ['$scope', 'profileData'];
	function ProfileController($scope, profileData){
		console.dir(profileData.user);
		$scope.profile = profileData.user;
	};
})();