;(function () {

'use strict';
angular.module('shared.module')
		.factory('myHttpInterceptor', myHttpInterceptor);

	/*@ngInject*/
	myHttpInterceptor.$inject = ['$q', 'jwt'];
	function myHttpInterceptor($q, jwt) {
	    return {
	        request: function(config) {
	        	//injected manually to get around circular dependency problem.
	        	config.headers = config.headers || {};
                var token = jwt.getToken();
                if (token) {
                    config.headers.Authorization = 'Bearer ' + token;
                }
	            return config;
	        },

	        responseError: function (response) {
	            if (response.status === 401) {
	                if(jwt.getToken())
	               		jwt.logout();
	               window.location.href = "http://localhost:8886/#/auth/sign-in";
	            }
	            if (response.status == 403) {
	                alert("Permission denied.");
	            }
	            if (response.status == 400) {
	                alert("Exception occured. Bad request.");
	            }
	            return $q.reject(response);
	        }
	    };
	};
})();
