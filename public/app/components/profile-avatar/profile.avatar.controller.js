;(function () {
	'use strict';
	angular.module('meanapp')
			.controller('ProfileAvatarController', ProfileAvatar);

	/*@ngInject*/
	ProfileAvatar.$inject = ['$scope', 'FileUploader'];
	function ProfileAvatar($scope, FileUploader) {

		$scope.loading = false;
		$scope.uploader = new FileUploader();

	};
})();
