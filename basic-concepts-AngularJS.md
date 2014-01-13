# Basic concepts AngularJS

## Table of Contents

* <a href='#directives'>Directives</a>
* <a href='#scope'>Scope</a>
* <a href='#service'>Service</a>
* <a href='#filter'>Filter</a>
* <a href='#module'>Module</a>


### <a name='directives'>Directives</a>

We use directives for almost declarative tasks.At a high level, directives are markers on a DOM element (such as an attribute, element name, or CSS class) that tell AngularJS's HTML compiler ($compile) to attach a specified behavior to that DOM element or even transform the DOM element and its children.

Angular comes with a set of these directives built-in, like ngBind, ngModel, and ngView. Much like you create controllers and services, you can create your own directives for Angular to use. When Angular bootstraps your application, the HTML compiler traverses the DOM matching directives against the DOM elements.

Prefer using the dash-delimited format (e.g. ng-bind for ngBind). If you want to use an HTML validating tool, you can instead use the data-prefixed version (e.g. data-ng-bind for ngBind). The other forms shown above are accepted for legacy reasons but we advise you to avoid them.

All of the Angular-provided directives match 
(<span my-dir="exp"></span>) - attribute name,
(<my-dir></my-dir>) - tag name, 
(<!-- directive: my-dir exp -->) - comments, or 
(<span class="my-dir: exp;"></span>) - class name. 

Prefer using directives via tag name and attributes over comment and class names. Doing so generally makes it easier to determine what directives a given element matches.

For more details: http://docs.angularjs.org/guide/directive 

### <a name='scope'>Scope</a>

Scope is an object that refers to the application model. It is an execution context for expressions. Scopes are arranged in hierarchical structure which mimic the DOM structure of the application. Scopes can watch expressions and propagate events

Scope is the glue between application controller and the view. During the template linking phase the directives set up $watch expressions on the scope. The $watch allows the directives to be notified of property changes, which allows the directive to render the updated value to the DOM.

Both controllers and directives have reference to the scope, but not to each other. This arrangement isolates the controller from the directive as well as from DOM. This is an important point since it makes the controllers view agnostic, which greatly improves the testing story of the applications.

For more details: http://docs.angularjs.org/guide/scope

### <a name='service'>Services</a>

Angular services are singletons objects or functions that carry out specific tasks common to web apps. Angular has a number of built in services, such as the $http service, which provides access to the browser's XMLHttpRequest object for making requests to a server. You can also create your own custom services.

To use an Angular service, you identify it as a dependency for the component (controller, service, filter or directive) that depends on the service. Angular's dependency injection subsystem takes care of the rest.

Sample, where declare service cartService with two dependencies- $http and loginService : 
 angular.module('testModule',[]).service('cartService', ['$http', 'loginService', function ($http, loginService) {...}]);

For more details: http://docs.angularjs.org/guide/dev_guide.services.understanding_services

### <a name='filter'>Filters</a>

A filter formats the value of an expression for display to the user. They can be used in view templates, controllers or services and it is easy to define your own filter.

Writing your own filter is very easy: just register a new filter factory function with your module. Internally, this uses the filterProvider. This factory function should return a new filter function which takes the input value as the first argument. Any filter arguments are passed in as additional arguments to the filter function.
Sample:
angular.module('MyReverseModule', []).filter('uppercase', function() {
    return function(input) {
      var out = "";
      out = input.toUpperCase();
      return out;
    }
  });

Filters can be applied to expressions in view templates using the following syntax: {{ expression | filter }}
Filters can be applied to the result of another filter. This is called "chaining" and uses the following syntax: {{ expression | filter1 | filter2 | ... }}
Filters may have arguments. The syntax for this is: {{ expression | filter:argument1:argument2:... }}

For more details: http://docs.angularjs.org/guide/filter

### <a name='module'>Module</a>

Angular apps don't have a main method. Instead modules declaratively specify how an application should be bootstrapped. 

For more details: http://docs.angularjs.org/guide/module

