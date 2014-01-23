# Filters

A filter formats the value of an expression for display to the user. They can be used in view templates, controllers or services and it is easy to define your own filter.

Using in templates:

 {{ expression | filter }}
 {{ expression | filter1 | filter2 | ... }}
 {{ expression | filter:argument1:argument2:... }}

If you want use it in controlles you should add it in dependency 
