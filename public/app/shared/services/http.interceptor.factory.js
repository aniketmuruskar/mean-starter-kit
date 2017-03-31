;(function () {

'use strict';
angular.module('shared.module')
		.factory('myHttpInterceptor', myHttpInterceptor);

	/*@ngInject*/
	myHttpInterceptor.$inject = ['$q', '$injector'];
	function myHttpInterceptor($q, $injector) {
	    return {
	        request: function(config) {
	        	//injected manually to get around circular dependency problem.
                var AuthService = $injector.get('auth');

	        	config.headers = config.headers || {};
                var token = AuthService.getToken();
                alert(token);
                if (token) {
                    config.headers.Authorization = 'Bearer ' + token;
                }
	            return config;
	        },

	        responseError: function (response) {
	            alert("Please login again.");
	            if (response.status === 401) {
	               window.location.href = "http://localhost:8886/#!/auth/sign-in";
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
