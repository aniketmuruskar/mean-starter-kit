angular.module('meanapp')
		.controller('PostController', PostController);

/*@ngInject*/
PostController.$inject = ['$scope', '$http', '$state'];
function PostController($scope, $http, $state){

	$scope.post = {
        title: '',
        author: '',
        description: '',
        status: 0
    };

    $scope.loading = false;

    $scope.createPost = function(){

        $scope.loading = true;

        $http.post('/api/createpost', $scope.post)
            .then(function success(response) {
                $scope.loading = false;
                $scope.post = {};
                
                $state.go("postlist");
            }, function error(response){
                $scope.loading = false;

                alert('Sorry!, there is an error. Please try again');
        });
    };
};