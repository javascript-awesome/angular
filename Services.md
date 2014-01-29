# Services #

##Description

Angular services are singletons objects that carry out specific tasks common to web apps. Angular has a number of built in services, such as the $http service. Like other core Angular variables and identifiers, the built-in services always start with $ (such as $http mentioned above). You can also create your own custom services.

To use service you need to put the name of service in a list of arguments in order to inject it:

	app.run(['$http', function ($http) {
      ...
      $http.post(url,model);
	}]);

##Service types 
1) Constant

This type is usually used to make default configs in directives. The values of constant can't be modified(it can be modified at config stage of module). 

	app.constant('someConfig', {
     	config1: true,
   		config2: "Default value"
	});
 
2) Value

In contradistinction to constant value can be modified and it can be used only from Run stage of module and futher. Usually it is used to store values which can't be calculated inside a service.

	app.value('someValue', {
  		config1: true,
  		config2: "Default value"
	});


3) Factory

Factory is a service which can return any type of data. It doesn't contain any rules of creating the data. 

	app.factory('myFactory', function() {
	    var thisIsPrivateVariable = "SomePrivateValue";
  		function getPrivateValue() { return thisIsPrivateVariable; }

  		return {
	    	      variable: "This variable is public",
	    	      getPrivateValue: getPrivateValue
  			   };
	});


4) Service

The main difference from Factory is that Service uses constructor and runs it at first call. Actually Service equals to the next code

	app.factory('foo2', function() {
  		return new Foobar();
	});


	function Foobar() { //this is a Class
  		var thisIsPrivate = "Private";
	  	this.variable = "This is public";
  		this.getPrivate = function() {
	    	return thisIsPrivate;
  		};
	}


5) Provider


If we need to extend a behavior of bullt-in service(except for Constant) we can use decorator pattern next way:

	app.config(function($provide) {
  		$provide.decorator('foo', function($delegate) {
    		$delegate.greet = function() {
      			return "Hello, I am a new function of 'foo'";
    		};

    		return $delegate;
  		});
	});

$provide has a special function decorator which gives us an opportunity to decorate a service.


##Built-in services (for v1.2.10)

1)$anchorScroll
    checks current value of $location.hash() and scroll to related element
	
	Example:
	Scroll to element with id "bottom"
	$location.hash('bottom');    
	$anchorScroll();


2)$animate
 provides animation detection support while performing DOM operations (enter, leave and move) as well as during addClass and removeClass operations. When any of these operations are run, the $animate service will examine any JavaScript-defined animations (which are defined by using the $animateProvider provider object) as well as any CSS-defined animations against the CSS classes present on the element once the DOM operation is run.

The $animate service is used behind the scenes with pre-existing directives and animation with these directives will work out of the box without any extra configuration.

Requires the ngAnimate module to be installed.

Please visit the ngAnimate module overview page learn more about how to use animations in your application.

3)$cacheFactory

Factory that constructs cache objects and gives access to them.

4)$compile

Compiles an HTML string or DOM into a template and produces a template function, which can then be used to link scope and the template together.

The compilation is a process of walking the DOM tree and matching DOM elements to directives.

5)$controller

this service is responsible for instantiating controllers.

It's just a simple call to $injector, but extracted into a service, so that one can override this service with BC version.

6)$document

A jQuery or jqLite wrapper for the browser's window.document object.

7)$exceptionHandler

Any uncaught exception in angular expressions is delegated to this service. The default implementation simply delegates to $log.error which logs it into the browser console.

8)$filter

Filters are used for formatting data displayed to the user. This service is used in order to get filter function by name: $filter(name);

9)$http

The $http service is a core Angular service that facilitates communication with the remote HTTP servers via the browser's XMLHttpRequest object or via JSONP.

10)$httpBackend

HTTP backend used by the service that delegates to XMLHttpRequest object or JSONP and deals with browser incompatibilities.

You should never need to use this service directly, instead use the higher-level abstractions: $http or $resource.

11)$interpolate

Compiles a string with markup into an interpolation function. This service is used by the HTML $compile service for data binding. 

12)$interval

Angular's wrapper for window.setInterval. The fn function is executed every delay milliseconds.

The return value of registering an interval function is a promise. This promise will be notified upon each tick of the interval, and will be resolved after count iterations, or run indefinitely if count is not defined. The value of the notification will be the number of iterations that have run. To cancel an interval, call $interval.cancel(promise).

13)$locale

service provides localization rules for various Angular components.

14)$location

The $location service parses the URL in the browser address bar (based on the window.location) and makes the URL available to your application. Changes to the URL in the address bar are reflected into $location service and changes to $location are reflected into the browser address bar.

The $location service:

* Exposes the current URL in the browser address bar, so you can
 * Watch and observe the URL.
 * Change the URL.
* Synchronizes the URL with the browser when the user
 * Changes the address bar.
 * Clicks the back or forward button (or clicks a History link).
 * Clicks on a link.
* Represents the URL object as a set of methods (protocol, host, port, path, search, hash).

15)$log

Simple service for logging. Default implementation safely writes the message into the browser's console (if present).

The main purpose of this service is to simplify debugging and troubleshooting.

16)$parse

Converts Angular expression into a function.

17)$q

A promise/deferred implementation inspired by Kris Kowal's Q.

The CommonJS Promise proposal describes a promise as an interface for interacting with an object that represents the result of an action that is performed asynchronously, and may or may not be finished at any given point in time.

18)$rootElement

The root element of Angular application. This is either the element where ngApp was declared or the element passed into angular.bootstrap. The element represent the root element of application. It is also the location where the applications $injector service gets published, it can be retrieved using $rootElement.injector().

19)$rootScope

Every application has a single root scope. All other scopes are descendant scopes of the root scope. Scopes provide separation between the model and the view, via a mechanism for watching the model for changes. They also provide an event emission/broadcast and subscription facility.

20)$sce

This is a service that provides Strict Contextual Escaping services to AngularJS.

21)$sceDelegate

$sceDelegate is a service that is used by the $sce service to provide Strict Contextual Escaping (SCE) services to AngularJS.

22)$templateCache

The first time a template is used, it is loaded in the template cache for quick retrieval. You can load templates directly into the cache in a script tag, or by consuming the $templateCache service directly.

23)$timeout

Angular's wrapper for window.setTimeout. The fn function is wrapped into a try/catch block and delegates any exceptions to $exceptionHandler service.

24)$window

A reference to the browser's window object. While window is globally available in JavaScript, it causes testability problems, because it is a global variable. In angular we always refer to it through the $window service, so it may be overridden, removed or mocked for testing.

### For details info look at:

* http://www.ng-newsletter.com/posts/beginner2expert-services.html
* http://blog.pluralsight.com/angularjs-step-by-step-services


