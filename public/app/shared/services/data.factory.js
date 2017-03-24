angular.module('shared.module')
		.factory('data', dataService);

dataService.$inject = ['$http', 'auth'];

function dataService($http, auth){

	function getProfile() {
		var url = '/api/profile/user';
	    return $http.get(url, {
            headers: {Authorization: 'Bearer '+auth.getToken()}
  		}).then(function (response) {
	      return response.data;
	    });
	};

	function getData(url) {
		return $http.get(url, {
            headers: {Authorization: 'Bearer '+auth.getToken()}
  		}).then(function (response) {
	      return response.data;
	    });
	};
	
	function postData(url, data) {
		return $http.post(url, data, {
            headers: {Authorization: 'Bearer '+auth.getToken()}
  		}).then(function (response) {
	      return response.data;
	    });
	};

  	return {
    	profile: getProfile,
    	get: getData,
    	post: postData
  	};
}