angular.module('meanapp')
		.controller('PostController', PostController);

/*@ngInject*/
PostController.$inject = ['$scope', '$http', '$state', 'auth', '$stateParams'];
function PostController($scope, $http, $state, auth, $stateParams){

    $scope.post = {
        title: '',
        author: '',
        description: '',
        status: 0
    };

    if(!angular.isUndefined($stateParams.postId) || $stateParams.postId){
        $scope.post = post.data;
    }else{
        alert('No Params');
    }

	

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

    $scope.editPost =  function(){

    };
};