# Routing

* <a href='#Syntax'>Syntax to add Routing</a>
* <a href='#Parameters'>How to pass Parameters in Route Urls</a>
* <a href='CustomData'>Add Custom Data to RouteProvider</a>

In this article we will go through the next useful feature of AngularJS called Routing. 
Dividing it in Views and using Routing to load different part of app helps in logically dividing the app and making it more manageable.

Application routes in Angular are declared via the $routeProvider, which is the provider of the $route service. This service makes it easy to wire together controllers, view templates, and the current URL location in the browser. Using this feature we can implement deep linking, which lets us utilize the browser’s history (back and forward navigation) and bookmarks.

### <a name='Syntax'>Syntax to add Routing</a>

Below is the syntax to add routing and views information to an angular application. We defined an angular app “sampleApp” using angular.module method. Once we have our app, we can use config() method to configure $routeProvider. $routeProvider provides method .when() and .otherwise() which we can use to define the routing for our app.

        var sampleApp = angular.module('phonecatApp', []);
  
        sampleApp .config(['$routeProvider', function($routeProvider) {
          $routeProvider.
          when('/addOrder', {
            templateUrl: 'templates/add-order.html',
            controller: 'AddOrderController'
          }).
          when('/showOrders', {
            templateUrl: 'templates/show-orders.html',
            controller: 'ShowOrdersController'
          }).
          otherwise({
            redirectTo: '/addOrder'
          });
        }]);

In above code we defined two urls /addOrder and /showOrders and mapped them with views templates/add-order.html and templates/show-orders.html respectively. When we open http://app/#addOrder url in browser, Angular automatically matches it with the route we configures and load add-order.html template. It then invokes AddOrderController where we can add logic for our view.

### <a name='Parameters'>How to pass Parameters in Route Urls</a>

Now let us see how can we define parameters in route urls.
Consider below scenario. We want to display details of different orders. Based on a parameter order_id we will define order details in view.

In angular while define route we can define parameters using orderId in url. For example:

        when('/ShowOrder/:orderId', {
          templateUrl: 'templates/show_order.html',
          controller: 'ShowOrderController'
        });

And we can read the parameter in ShowOrderController by using $routeParams.orderId.
        
        ...
        $scope.order_id = $routeParams.orderId;
        ...

### <a name='CustomData'>Add Custom Data to RouteProvider</a>

The $routeProvider provides methods when() and otherwise() which we used to define url routes. Sometime we might want to pass custom data based on certain route. For example you might use same Controller in different routes and use some custom data. For example:

        when('/AddNewOrder', {
          templateUrl: 'templates/add_order.html',
          controller: 'CommonController',
          foodata: 'addorder'
        }).
        when('/ShowOrders', {
          templateUrl: 'templates/show_orders.html',
          controller: 'CommonController',
          foodata: 'showorders'
        });
 
        sampleApp.controller('CommonController', function($scope, $route) {
          //access the foodata property using $route.current
          var foo = $route.current.foodata;
          alert(foo);
        });
In above code we defined a new property “foodata” while defining route. This property is then accessed in controller using $route.current.foodata.

### For deatils info look at:

* http://docs.angularjs.org/tutorial/step_07
* http://docs.angularjs.org/api/ngRoute.$route
* http://www.bennadel.com/blog/2420-Mapping-AngularJS-Routes-Onto-URL-Parameters-And-Client-Side-Events.htm



