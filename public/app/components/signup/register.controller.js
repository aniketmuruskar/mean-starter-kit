angular.module('meanapp')
		.controller('RegisterController', RegisterController);

/*@ngInject*/
RegisterController.$inject = ['$scope', '$http', '$state'];
function RegisterController($scope, $http, $state){

	$scope.user = {};

	$scope.register = function(){
		$http.post('/api/user/register', $scope.user)
            .then(function success(response) {
                $scope.loading = false;
            }, function error(response){
                $scope.loading = false;

                alert('Sorry!, there is an error. Please try again');
        });
	};
};