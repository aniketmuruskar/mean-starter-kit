angular.module('meanapp')
		.controller('ProfileController', ProfileController);

/*@ngInject*/
ProfileController.$inject = ['$scope', '$http', '$state'];
function ProfileController($scope, $http, $state){
};