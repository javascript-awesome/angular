# AngularJS: Understanding design pattern

Recommendations and guidelines for implementing AngularJS MVW (Model View Whatever) design pattern in client-side applications.

## Table of Contents

* [Preface] (#preface)
* [Controller] (#controller)
* [Scope] (#scope)
* [Model] (#model)
	* [Model Implementation] (#model-implementation)
	* [Creating new instances] (#creating-new-instances)
	* [Global Model](#global-model)
* [Resource] (#resource)
	* [Resource Implementation] (resource-implementation)
* [Services] (#services)
* [Client-Side Structure] (#client-side-structure)



##Preface

"**MVC vs MVVM vs MVP**. What a controversial topic that many developers can spend hours and hours debating and arguing about!

For several years AngularJS was closer to MVC (or rather to one of its client-side variants), but with time and due to many refactoring and API improvements, it's now closer to MVVM – the **$scope** object could be considered the ViewModel that is decorated by a function that we call a Controller.

Being able to categorize a framework and put it into one of the MV* buckets has some advantages. It can help developers get more comfortable with its APIs by making it easier to create a mental model that represents the application built with the framework.
It can also help us establish the terminology that is used by developers.

In a word, I'd rather see developers build kick-ass apps that are well-designed and follow separation of concerns, than see them waste time arguing about MV* nonsense.

And for this reason, I hereby declare AngularJS to be a MVW framework - Model-View-Whatever. Where “Whatever” stands for "whatever works for you".

Angular gives you a lot of flexibility to nicely separate presentation logic from business logic and presentation state. Please use it to fuel your productivity and application maintainability rather than heated discussions about things that at the end of the day don't matter that much."


>**Source**: AngularJS: Shared publicly - <a href="https://plus.google.com/+AngularJS/posts/aZNVhj355G2">Jul 19, 2012</a>.

##Controller

 - Controller should be just an **interlayer** between model and view. Try to make it as **thin** as possible.

 - It is highly recommended to **avoid business logic** in controller. It should be moved to model.

 - Controller may communicate with other controllers using method invocation (possible when children wants to communicate with parent) or *$emit*, *$broadcast* and *$on* methods. The emitted and broadcasted messages should be kept to a minimum. 

 - Controller should **not care about presentation** or DOM manipulation.


 - Try to **avoid nested controllers**. In this case parent controller is interpreted as model. Inject models as shared services instead.
   

 - **Scope** in controller should be used for **binding** model with view and   
   encapsulating **View Model** as for **Presentation Model** design pattern.


##Scope

Treat scope as **read-only in templates** and **write-only in controllers**. The purpose of the scope is to refer to model, not to be the model.

When doing bidirectional binding (ng-model) make sure you don't bind directly to the scope properties.


##Model


Model in AngularJS is a **singleton** defined by **service**.

Model provides an excellent way to separate data and display.

Models are prime candidates for unit testing, as they typically have exactly one dependency (some form of event emitter, in common case the *$rootScope*) and contain highly testable **domain logic**.

 - Model should be considered as an implementation of particular unit.
   It is based on single-responsibility-principle. Unit is an instance that is responsible for its own scope of related logic that may represent single entity in real world and describe it in programming world in terms of **data and state**.

 - Model should encapsulate your application’s data and provide an **API**
   to access and manipulate that data.

 - Model should be **portable** so it can be easily transported to similar
   application.

 - By isolating unit logic in your model you have made it easier to
   locate, update, and maintain.

 - Model can use methods of more general global models that are common
   for the whole application.

 - Try to avoid composition of other models into your model using dependency injection if it is not really dependent to decrease components coupling and increase unit **testability** and **usability**.

 - Try to avoid using event listeners in models. It makes them harder to test and generally kills models in terms of single-responsibility-principle.


##Model Implementation

As model should encapsulate some logic in terms of data and state, it should architecturally restrict access to its members thus we can guarantee loose coupling.

The way to do it in AngularJS application is to define it using *factory* service type. This will allow us to define private properties and methods very easy and also return publically accessible ones in single place that will make it really readable for developer.

An example:


```javascript
angular.module('search')
.factory( 'searchModel', ['searchResource', function (searchResource) {

  var itemsPerPage = 10,
  currentPage = 1,
  totalPages = 0,
  allLoaded = false,
  searchQuery;

  function init(params) {
    itemsPerPage = params.itemsPerPage || itemsPerPage;
    searchQuery = params.substring || searchQuery;
  }

  function findItems(page, queryParams) {
    searchQuery = queryParams.substring || searchQuery;

    return searchResource.fetch(searchQuery, page, itemsPerPage).then( function (results) {
      totalPages = results.totalPages;
      currentPage = results.currentPage;
      allLoaded = totalPages <= currentPage;

      return results.list
    });
  }

  function findNext() {
    return findItems(currentPage + 1);
  }

  function isAllLoaded() {
    return allLoaded;
  }

  // return public model API
  return {
    /**
     * @param {Object} params
     */
    init: init,

    /**
     * @param {Number} page
     * @param {Object} queryParams
     * @return {Object} promise
     */
    find: findItems,

    /**
     * @return {Boolean}
     */
    allLoaded: isAllLoaded,

    /**
     * @return {Object} promise
     */
    findNext: findNext
  };
});
```


##Creating New Instances

Try to avoid having a factory that returns a *new* able function as this breaks down dependency injection and makes the library behave awkwardly, especially for third parties.

A better way to accomplish the same thing is to use the factory as an API to return a collection of objects with get and set methods attached to them.

An example:


```javascript
angular.module('car')
 .factory( 'carModel', ['carResource', function (carResource) {

  function Car(data) {
    angular.extend(this, data);
  }

  Car.prototype = {
    save: function () {
      // TODO: strip irrelevant fields
      var carData = //...
      return carResource.save(carData);
    }
  };

  function getCarById ( id ) {
    return carResource.getById(id).then(function (data) {
      return new Car(data);
    });
  }

  // the public API
  return {
    // ...
    findById: getCarById
    // ...
  };
});
```

##Global Model

In general, try to avoid creating “global” models and design your models properly, so they can be injected into controllers and used in your views. 

However, in some specific cases, some methods do require global accessibility within an application.

To make it possible, you can define a ‘common’ property in `$rootScope` and bind it to `commonModel` during application bootstrap:

All your global methods will live within the `common` property. This is a type of namespace.

Do not define any methods directly in your `$rootScope`. This can lead to unexpected behavior when used with the **ngModel** directive within your view scope - (See: http://stackoverflow.com/a/18128502/2230007), generally littering your scope and leading to scope method overriding issues.


An example:

```javascript
angular.module('app', ['app.common'])
.config(...)
.run(['$rootScope', 'commonModel', function ($rootScope, commonModel) {
  $rootScope.common = 'commonModel';
}]);
```

##Resource 

Resource lets you interact with different **data sources**. 

Should be implemented using **single-responsibility-principle**.

In particular case it is a **reusable** proxy to HTTP/JSON endpoints.

Resources are injected in models and provide possibility to send/retrieve data.


###Resource Implementation

A factory which creates a resource object lets you interact with [RESTful][1] server-side data sources.

The returned resource object has action methods which provide high-level actions without the need to interact with the low-level [$http][2] service.

##Services


**Both model and resource are services**.

Services are unassociated, **loosely coupled** units of functionality that are self-contained.

A service is a feature that Angular brings to client-side web apps from the server side, where services have been commonly used for a long time.

Services in Angular apps are substitutable objects that are wired together using [dependency injection][3].


Angular comes with different types of services. Each one has its own use cases. Please refer to [*Understanding Service Types*][4] for more details.

Try to consider the [main principles of service architecture][5] in your application.


In general, according to the Web Services Glossary:

A service is an abstract resource that represents a capability of performing tasks that form a coherent functionality from the point of view of provider entities and requester entities. To be used, a service must be realized by a concrete provider agent.


##Client-Side Structure

In general, the client side of the application is split into modules. Each module should be testable as a unit.

Try to define modules depending on their feature/functionality or view, not by type.

Module components may be conventionally grouped by types such as controllers, models, views, filters, directives, etc.

But module itself remains **reusable**, **transferable** and **testable**.

It is also much easier for developers to find some sections of code and all its dependencies. Please refer to [*Code Organization in Large AngularJS and JavaScript Applications*][6] for details.

An example of folders structuring:


```
|-- src/
|   |-- app/
|   |   |-- app.js
|   |   |-- home/
|   |   |   |-- home.js
|   |   |   |-- homeCtrl.js
|   |   |   |-- home.spec.js
|   |   |   |-- home.tpl.html
|   |   |   |-- home.less
|   |   |-- user/
|   |   |   |-- user.js
|   |   |   |-- userCtrl.js
|   |   |   |-- userModel.js
|   |   |   |-- userResource.js
|   |   |   |-- user.spec.js
|   |   |   |-- user.tpl.html
|   |   |   |-- user.less
|   |   |   |-- create/
|   |   |   |   |-- create.js
|   |   |   |   |-- createCtrl.js
|   |   |   |   |-- create.tpl.html
|   |-- common/
|   |   |-- authentication/
|   |   |   |-- authentication.js
|   |   |   |-- authenticationModel.js
|   |   |   |-- authenticationService.js
|   |-- assets/
|   |   |-- images/
|   |   |   |-- logo.png
|   |   |   |-- user/
|   |   |   |   |-- user-icon.png
|   |   |   |   |-- user-default-avatar.png
|   |-- index.html
```


Good example of angular application structuring is implemented by *angular-app* - https://github.com/angular-app/angular-app/tree/master/client/src

This is also considered by modern application generators - https://github.com/yeoman/generator-angular/issues/109

[1]: http://en.wikipedia.org/wiki/Representational_State_Transfer
[2]: http://docs.angularjs.org/api/ng.$http
[3]: http://docs.angularjs.org/guide/di
[4]: http://angular-tips.com/blog/2013/08/understanding-service-types/
[5]: http://en.wikipedia.org/wiki/Service-oriented_architecture#Principles
[6]: http://cliffmeyers.com/blog/2013/4/21/code-organization-angularjs-javascript
