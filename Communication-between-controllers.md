##Communication between Controllers in AngularJS
#By service

When you want to have a shared variable between controllers you can implement it by a custom "commonDataExchange" service

	var myApp = angular.module('myApp', []);
	myApp.factory('commonDataExchange', function() {
    	return {
        	      value1: "Default value"
        	   }
	})

	function FirstCtrl($scope, commonDataExchange){
  		$scope.localValue = commonDataExchange.value1;
	}

	function SecondCtrl($scope, commonDataExchange){
  		$scope.localValue = CommonDataExchange.value1;
	}


##$broadcast $emit  $on


In AngularJS you can also send broadcast messages to notify subscribes that smth has changed. You can do this by:

	$scope.$broadcast("EventName", args);

    or

	$scope.$emit("EventName", args);

$broadcast dispatches an event name downwards to all child scopes (and their children) notifying the registered ng.$rootScope.Scope#methods_$on listeners.

The event life cycle starts at the scope on which $broadcast was called. All listeners listening for name event on this scope get notified. Afterwards, the event propagates to all direct and indirect scopes of the current scope and calls all registered listeners along the way. The event cannot be canceled.

Any exception emitted from the listeners will be passed onto the $exceptionHandler service.

$emit dispatches an event name upwards through the scope hierarchy notifying the registered.

The other scopes can track changes by subscribing:

	$scope.$on("EventName", function(event, arguments){...});



### For details info look at:

* https://egghead.io/lessons/angularjs-sharing-data-between-controllers