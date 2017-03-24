angular.module('shared.module')
		.directive('post', function(){
			return {
				restrict : 'E',
				template:'<h1>Post Directive</h1>'
			};
		});