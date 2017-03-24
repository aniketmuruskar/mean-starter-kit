angular.module('shared.module')
		.directive('post', function(){
			return {
				restrict : 'E',
				transclude: false,
				scope:{},
				templateUrl:'app/shared/directive/post/post.directive.template.html',
				link: function(scope) {
			      scope.title = 'Creating Directive by transclude:false';
			    }
			};
		});