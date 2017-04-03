;(function () {
	'use strict';
	angular.module('meanapp')
			.controller('ProfileController', ProfileController);

	/*@ngInject*/
	ProfileController.$inject = ['$scope', 'profileData', 'data'];
	function ProfileController($scope, profileData, data){

		$scope.profile = profileData.user;
		$scope.loading = false;

		$scope.updateProfile = function(){
			$scope.loading = true;
			var url = '/api/profile/update'
			data.post(url, $scope.profile).then(function (response) {
		      	if(response.result)
		      		$scope.alert = {
                  		type: 'alert-success',
                  		message: 'Your profile has been updated successfully',
                  		show: true
                	};
		      	$scope.loading = false;
		    });
		};
	};
})();
