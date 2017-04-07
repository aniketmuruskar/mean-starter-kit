;(function () {
	'use strict';
	angular.module('shared.module')
			.factory('data', dataService);

	/*@ngInject*/		
	dataService.$inject = ['$http'];
	function dataService($http) {

		function getData(url) {
			return $http.get(url).then(function (response) {
		      return response.data;
		    });
		};
		
		function postData(url, data) {
			return $http.post(url, data).then(function (response) {
		      return response.data;
		    });
		};

	  	return {
	    	get: getData,
	    	post: postData
	  	};
	}
})();
