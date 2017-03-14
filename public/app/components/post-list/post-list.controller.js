angular.module('meanapp')
		.controller('PostListController', PostListController);

/*@ngInject*/
PostListController.$inject = ['$scope', '$http', '$state', 'auth'];
function PostListController($scope, $http, $state, auth){

	$scope.myposts = [];
    $scope.loading = true;


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
        var url = '/api/posts/allposts?' + params;

        return $http.get(url, {
            headers: {Authorization: 'Bearer '+auth.getToken()}
        }).then(function (response) {
            $scope.loading = false;
            return {
              'rows': response.data.rows,
              'header': response.data.header,
              'pagination': response.data.pagination,
              'sortBy': '_id',
              'sortOrder': 'dsc'
            }
        }, function error(response){
            $scope.loading = false;
        });
    };    
};