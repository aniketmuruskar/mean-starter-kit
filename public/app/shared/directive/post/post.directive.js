angular.module('shared.module')
	.directive('post', function(){
		return {
			restrict : 'E',
			transclude: false,
			scope:{
				post:'='
			},
			templateUrl:'app/shared/directive/post/post.directive.template.html'
		};
	});
