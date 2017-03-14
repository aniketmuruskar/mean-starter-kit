angular.module('meanapp')
		.controller('ProfileController', ProfileController);

/*@ngInject*/
ProfileController.$inject = ['$scope', '$http', '$state', 'getProfile'];
function ProfileController($scope, $http, $state, getProfile){
	$scope.profile = getProfile;
};