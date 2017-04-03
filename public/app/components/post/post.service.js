;(function () {

'use strict';
angular.module('meanapp')
		.factory('Post', postService);

	postService.$inject = ['$http'];
	
	function postService($http) {
		// each function returns a promise object 
		return {
			get : function(url) {
				return $http.get(url);
			},
			create : function(postData) {
				return $http.post('/api/posts/createpost', postData);
			},
			update : function(postData) {
				return $http.post('/api/posts/updatepost', postData);
			},
			delete : function(id) {
				return $http.delete('/api/posts/delete' + id);
			},
			getResponse: function(response) {
				return {
	              'rows': response.data.rows,
	              'header': response.data.header,
	              'pagination': response.data.pagination,
	              'sortBy': '_id',
	              'sortOrder': 'dsc'
	            }
			}
		};
	};
})();
