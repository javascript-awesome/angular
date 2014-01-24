# Filters

A filter formats the value of an expression for display to the user. They can be used in view templates, controllers or services and it is easy to define your own filter.

Using in templates:

        {{ expression | filter }}
        {{ expression | filter1 | filter2 | ... }}
        {{ expression | filter:argument1:argument2:... }}

If you want use it in controlles you should add it in dependency. Like this:

        angular.module('phonecatApp', ['phonecatFilters']). ...

Angular has custom filters like:

* <a href='http://docs.angularjs.org/api/ng.filter:currency'>Currency</a>
* <a href='http://docs.angularjs.org/api/ng.filter:date'>date</a>
* <a href='http://docs.angularjs.org/api/ng.filter:filter'>filter</a>
* <a href='http://docs.angularjs.org/api/ng.filter:json'>json</a>
* <a href='http://docs.angularjs.org/api/ng.filter:limitTo'>limitTo</a>
* <a href='http://docs.angularjs.org/api/ng.filter:lowercase'>lowercase</a>
* <a href='http://docs.angularjs.org/api/ng.filter:number'>number</a>
* <a href='http://docs.angularjs.org/api/ng.filter:orderBy'>orderBy</a>
* <a href='http://docs.angularjs.org/api/ng.filter:uppercase'>uppercase</a>

Or you can create yout own filter you should write something like this:

        angular.module('phonecatFilters', []).filter('checkmark', function() {
          return function(input) {
            return input ? '\u2713' : '\u2718';
          };
        });


### For deatils info look at:

* http://docs.angularjs.org/guide/filter
* http://docs.angularjs.org/tutorial/step_09
* http://suhairhassan.com/2013/07/25/angularjs-in-depth-part-2.html#.UuJS6BDFFph


