;(function () {

'use strict';
angular.module('shared.module')
		.factory('myHttpInterceptor', myHttpInterceptor);

	/*@ngInject*/
	myHttpInterceptor.$inject = ['$q', 'auth'];
	function myHttpInterceptor($q, auth) {
	    return {
	        request: function(config) {
	        	config.headers = config.headers || {};
                var token = auth.getToken();
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

/**
function myHttpInterceptor($q){
    return {
        request: function(config) {
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
*/
