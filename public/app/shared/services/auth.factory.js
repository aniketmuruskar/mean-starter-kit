;(function () {

'use strict';
angular.module('shared.module')
		.factory('auth', auth);

	auth.$inject = ['$window', '$http'];

	function auth($window, $http){

		var object = {};

		object.saveToken = function (token) {
	        $window.localStorage.setItem('jwtToken', token);
	    };
	    
	    object.getToken = function () {
	        return $window.localStorage.getItem('jwtToken');
	    };

	    object.parseJwt = function (token) {
	        var base64 = token.split('.')[1];
	        return JSON.parse($window.atob(base64));
	    };
	    
	    object.isLoggedIn = function() {
		  var token = object.getToken();
		  if(token){
		    var payload = object.parseJwt(token);
		    return payload.exp > Date.now() / 1000;
		  } else {
		    return false;
		  }
		};

	    object.currentUser = function(){
	    	if(object.isLoggedIn()){
		    	var token = object.getToken();
		    	var payload = object.parseJwt(token);
		    	return payload.name;
		  	}else{
		  		return 'Guest';
		  	}
	    };

	    object.login = function(user) {

	    	return $http.post('/api/authenticate', user).success(function(data){
	    		if(data.token){
	    			object.saveToken(data.token);
	    		}
			});
	    };

	    object.register = function(user) {
	    	return $http.post('/api/user/register', user);
	    };

	    object.logout = function () {
	        $window.localStorage.removeItem('jwtToken');
	    };

		return object;
	};
})();