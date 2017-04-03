;(function () {

'use strict';
angular.module('shared.module')
		.factory('auth', auth);

	auth.$inject = ['$window', '$http', 'jwt'];

	function auth($window, $http, jwt){

		var object = {};   

	    object.login = function(user) {

	    	return $http.post('/api/authenticate', user).then(function(response){
	    		if(response.data.token){
	    			jwt.saveToken(response.data.token);
	    		}
			});
	    };

	    object.register = function(user) {
	    	return $http.post('/api/user/register', user);
	    };

		return object;
	};
})();
