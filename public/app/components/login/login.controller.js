angular.module('meanapp')
		.controller('LoginController', LoginController);

/*@ngInject*/
LoginController.$inject = ['$scope', '$http', '$state'];
function LoginController($scope, $http, $state){

	$scope.user = {};

	$scope.authenticate = function(){
        
		$http.post('/api/authenticate', $scope.user)
            .then(function success(response) {
                $scope.loading = false;
            }, function error(response){
                $scope.loading = false;

                alert('Sorry!, there is an error. Please try again');
        });
	};
};