angular.module('meanapp')
		.controller('PostListController', PostListController);

/*@ngInject*/
PostListController.$inject = ['$scope', '$state', 'Post'];
function PostListController($scope, $http, Post) {
    
    $scope.init = {
      'count': 5,
      'page': 1,
      'sortBy': 'name',
      'sortOrder': 'dsc',
      'filterBase': 1 // set false to disable
    };

    $scope.filterBy = {
      'name': 'r',
      'sf-location': ''
    };

    $scope.getResource = function (params, paramsObj) {

        if($scope.loading)
                return;
        $scope.loading = true;
        var url = '/api/posts/allposts?' + params;
        return Post.get(url).then(function (response) {
            $scope.loading = false;
            return Post.getResponse(response);
        });
    };    
};
