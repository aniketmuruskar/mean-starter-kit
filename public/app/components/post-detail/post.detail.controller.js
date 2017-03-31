angular.module('meanapp')
		.controller('PostDetailController', PostDetailController);

/*@ngInject*/
PostDetailController.$inject = ['$scope', '$http', '$state', 'auth', '$stateParams', 'post'];
function PostDetailController($scope, $http, $state, auth, $stateParams, post){

    if(!angular.isUndefined($stateParams.postId) || $stateParams.postId) {
        $scope.post = post.data;
    } else {
        alert('No Params');
    }

    $scope.editPost =  function(){
        $scope.loading = false;
    };
};
