;(function () {
	'use strict';
	angular.module('shared.module')
			.directive('alertMsg', alertMsg);
         
	/*@ngInject*/
	alertMsg.$inject = ['$timeout'];
    function alertMsg($timeout){
        return {
        	restrict: 'E',
            scope:{
               alert: '='
            },
            link: function(scope, element, attrs, ctrl) {
                var timeoutId;

                element.on('$destroy', function() {
                  console.log('destroying alert message...');
                  $timeout.cancel(timeoutId);
                });

                // start the UI update process; save the timeoutId for canceling
                timeoutId = $timeout(function() {
                    scope.$apply(function(){
                        scope.alert.show = false;
                    });
                }, 7000);
            },
            templateUrl:'app/shared/directive/alert-msg/alert.message.template.html'           
        };
    };
})();
