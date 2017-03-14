angular.module('meanapp')
		.controller('ProfileController', ProfileController);

/*@ngInject*/
ProfileController.$inject = ['$scope', '$http', '$state', 'auth'];
function ProfileController($scope, $http, $state, auth){
};