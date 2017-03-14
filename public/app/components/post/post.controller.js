angular.module('meanapp')
		.controller('PostController', PostController);

/*@ngInject*/
PostController.$inject = ['$scope', '$http', '$state', 'auth'];
function PostController($scope, $http, $state, auth){

	$scope.post = {
        title: '',
        author: '',
        description: '',
        status: 0
    };

    $scope.loading = false;

    $scope.createPost = function(){

        $scope.loading = true;

        $http.post('/api/posts/createpost', $scope.post, {
                headers: {Authorization: 'Bearer '+auth.getToken()}
            }).then(function success(response) {
                $scope.loading = false;
                $scope.post = {};
                
                $state.go("postlist");
            }, function error(response){
                $scope.loading = false;

                alert('Sorry!, there is an error. Please try again');
        });
    };
};