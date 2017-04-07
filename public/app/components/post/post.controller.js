angular.module('meanapp')
		.controller('PostController', PostController);

/*@ngInject*/
PostController.$inject = ['$scope', '$state', 'Post'];
function PostController($scope, $state, Post){

    $scope.post = {
        title: '',
        author: '',
        description: '',
        status: 0
    };
    $scope.loading = false;

    $scope.createPost = function(){

        if($scope.loading) return;

        $scope.loading = true;
        Post.create($scope.post).then(function success(response) {
            $scope.loading = false;
            $scope.post = {
                status: 0
            };
            $scope.alert = {
              type: 'alert-success',
              message: 'Post has been added successfully',
              show: true
            }; 
            
        }, function error(response) {
            $scope.loading = false;
            alert('Sorry!, there is an error. Please try again');
        });
    };
};
