angular.module('shared.module', [])
		.service('data', dataService);

dataService.$inject = ['$http', 'auth'];

function dataService($http, auth){

	function getProfile() {
		var url = '/api/profile/user';
	    return $http.get(url, {
            headers: {Authorization: 'Bearer '+auth.getToken()}
  		}).then(function (response) {
	      return response.data;
	    });
	}
  	return {
    	profile: getProfile
  	};
}