angular.module('meanapp')
		.controller('PostListController', PostListController);

/*@ngInject*/
PostListController.$inject = ['$scope', '$http', '$state'];
function PostListController($scope, $http, $state){

	$scope.myposts = [];
    $scope.loading = true;

    $http.get('/api/myposts-list')
        .then(function success(response) {

            $scope.myposts = response.data;
            $scope.loading = false;

        }, function error(response){
            $scope.loading = false;
            alert('Sorry!, there is an error. Please try again');
        });
};