;(function () {
    'use strict';
    angular.module('meanapp')
    	.controller('DashboardController', DashboardController);

    /*@ngInject*/
    DashboardController.$inject = ['$scope', '$http', '$state'];
    function DashboardController($scope, $http, $state) {
    	
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
            alert('test');
            var url = '/api/posts/dashboard?' + params;

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
})();