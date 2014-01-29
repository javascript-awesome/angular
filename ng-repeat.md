#ng-repeate Angular Directive

##Description

This directive is used to instantiate a template(parent element) for each item from a collection. 


 	<ul>
    	<li ng-repeat="element in [{ text: 'First'}, { text: 'Second'}]">
    	    {{ element.text }}
    	</li>
 	</ul>

	will be rendered:

	<ul>
  	  <li>
	    First
  	  </li>
  	  <li>
    	Second
  	  </li>
	</ul>


Each instantiated template has its own scope, where the given loop variable is set to the current collection item. Inside this scope the next properties are available:

* $index  {integer} contains index value of current element.
* $first  {boolean} true if the repeated element is first in the iterator.
* $middle {boolean} true if the repeated element is between the first and last in the iterator.
* $last   {boolean} true if the repeated element is last in the iterator.
* $even   {boolean} true if the iterator position $index is even (otherwise false).
* $odd    {boolean} true if the iterator position $index is odd (otherwise false). 

 .

	<div ng-repeat="number in [3,4,5]">
	{{ $index }} {{ $first }} {{ $middle }} {{ $last }} {{ $even }} {{ $odd }}
	</div>
	
	will be rendered:
   
	<div>0 true false false</div>
	<div>1 false true false</div>
	<div>2 false false true</div>

##Special repeat start and end points

To repeat a series of elements instead of just one parent element, ngRepeat (as well as other ng directives) supports extending the range of the repeater by defining explicit start and end points by using ng-repeat-start and ng-repeat-end respectively. 
The ng-repeat-start directive works the same as ng-repeat, but will repeat all the HTML code (including the tag it's defined on) up to and including the ending HTML tag where ng-repeat-end is placed.

##Nested ng-repeat

Each ng-repeat creates a child scope with the passed data, and also adds an additional $index variable in that scope.
So what you need to do is reach up to the parent scope via $parent, and use that $index.

	Example:

	<ul>
	  <li ng-repeat="a in ['a', 'b', 'c']">    
	    <div ng-repeat="b in [1, 2, 3]">
	       {{$parent.$index}} - {{$index}}
	    </div>
	  </li>
	</ul>

### For details info look at:

* http://docs.angularjs.org/api/ng.directive:ngRepeat

