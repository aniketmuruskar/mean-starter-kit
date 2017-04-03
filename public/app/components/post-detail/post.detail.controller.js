;(function () {
    'use strict';
    angular.module('meanapp')
    		.controller('PostDetailController', PostDetailController);

    /*@ngInject*/
    PostDetailController.$inject = ['$scope', '$state', '$stateParams', 'postdetail', 'Post'];
    function PostDetailController($scope, $state, $stateParams, postdetail, Post){

        if(!angular.isUndefined($stateParams.postId) || $stateParams.postId) {
            $scope.post = postdetail.data.post;
        } else {
            alert('No stateParams');
        }

        $scope.editPost =  function(){

            $scope.loading = true;

            Post.update($scope.post).then(function success(response) {
                $scope.loading = false;
                $scope.alert = {
                  type: 'alert-success',
                  message: 'Post has been updated successfully',
                  show: true
                };               
            }, function error(response){
                $scope.loading = false;
                alert('Sorry!, there is an error. Please try again');
            });
        };
    };
})();
