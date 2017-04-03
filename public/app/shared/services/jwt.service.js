;(function () {
	'use strict';
	angular.module('shared.module')
			.service('jwt', jwtService);

	/*@ngInject*/
	jwtService.$inject = ['$window'];
	function jwtService($window) {
		var self = this;

		self.saveToken = function (token) {
	        $window.localStorage.setItem('jwtToken', token);
	    };
	    
	    self.getToken = function () {
	        return $window.localStorage.getItem('jwtToken');
	    };

	    self.parseJwt = function (token) {
	        var base64 = token.split('.')[1];
	        return JSON.parse($window.atob(base64));
	    };
	    
	    self.isLoggedIn = function() {
		  var token = self.getToken();
		  if(token) {
		    var payload = self.parseJwt(token);
		    return payload.exp > Date.now() / 1000;
		  } else {
		    return false;
		  }
		};

	    self.currentUser = function() {
	    	if(self.isLoggedIn()){
		    	var token = self.getToken();
		    	var payload = self.parseJwt(token);
		    	return payload.name;
		  	} else {
		  		return 'Guest';
		  	}
	    };

	    self.logout = function () {
	        $window.localStorage.removeItem('jwtToken');
	    };
	};
})();
