# Providing communications with the remote HTTP using Angular

## For providing communications with the remote HTTP servers angular has method:

* <a href='#http'>$http service</a>

## $http API is based on
* <a href='#deferred'>Deferred & Promice</a>

### <a name='http'>$http service</a>

As for me $http service is the simplest and clearest service for HTTP communication purpose.
The $http API is based on the deferred/promise APIs exposed by the $q service. About that we will talk later. 

So how can we use this servise and what properties does it have?

Just imagine we want to send request  and get all information about our customers. 
#### For this case we need write:

    $http({method: 'GET', url: '/customers'}).success(function(data, status, headers, config) {
      // this callback will be called asynchronously
      // when the response is available
      console.log(data);
    }).
    error(function(error, status, headers, config) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
      console.log(error, status);
    });


#### OR (simple form)

    $http.get('/customers').success(function(data, status, headers, config) { 
      console.log(data);
    }).
    error(function(error, status, headers, config) {
      console.log(error, status);
    });

#### Where returned object consists:

* data/error – {string|Object} – is the response body transformed with the transform functions.
* status – {number} – is HTTP status code of the response.
* headers – {function([headerName])} – is the header getter function.
* config – {Object} – is the configuration object that was used to generate the request.

#### Also $http service has next configuration parameters:


* method – {string} – HTTP method (e.g. 'GET', 'POST', etc)
* url – {string} – Absolute or relative URL of the resource that is being requested.
* params – {Object.<string|Object>} – Map of strings or objects which will be turned to ?key1=value1&key2=value2 after the url. If the value is not a string, it will be JSONified.
* data – {string|Object} – Data to be sent as the request message data.
* headers – {Object} – Map of strings or functions which return strings representing HTTP headers to send to the server. If the return value of a function is null, the header will not be sent.
* xsrfHeaderName – {string} – Name of HTTP header to populate with the XSRF token.
* xsrfCookieName – {string} – Name of cookie containing the XSRF token.
* transformRequest – {function(data, headersGetter)|Array.<function(data, headersGetter)>} – transform function or an array of such functions. The transform function takes the http request body and headers and returns its transformed (typically serialized) version.
* transformResponse – {function(data, headersGetter)|Array.<function(data, headersGetter)>} – transform function or an array of such functions. The transform function takes the http response body and headers and returns its transformed (typically deserialized) version.
* cache – {boolean|Cache} – If true, a default $http cache will be used to cache the GET request, otherwise if a cache instance built with $cacheFactory, this cache will be used for caching.
* timeout – {number|Promise} – timeout in milliseconds, or promise that should abort the request when resolved.
* withCredentials - {boolean} - whether to to set the withCredentials flag on the XHR object.
* responseType - {string} - see requestType.

#### All shortcut methods are:
* $http.get
* $http.head
* $http.post
* $http.put
* $http.delete
* $http.jsonp

#### Details information you can find: http://docs.angularjs.org/api/ng.$http

### <a name='deferred'>Deferred & Promice</a>

As I said later $http API is based on the deferred/promise APIs exposed by the $q service. Lets talk about these.

Idea of Deferred objects was taken from Kris Kowal's library <a href='https://github.com/kriskowal/q'>Q</a>. Its essence lies in the fact that if function can't return object without blocking, it returns Promice object. This object will observe the result of the function. When we receive returns object or error, Deferred object will show us this.

A new instance of deferred is constructed by calling $q.defer().

#### Methods

* resolve(value) – resolves the derived promise with the value. If the value is a rejection constructed via $q.reject, the promise will be rejected instead.
* reject(reason) – rejects the derived promise with the reason. This is equivalent to resolving it with a rejection constructed via $q.reject.
* notify(value) - provides updates on the status of the promises execution. This may be called multiple times before the promise is either resolved or rejected.

#### Deferred properties is:

Promise – promice object associated with this deferred.
These is an object which contains the result of operations, that we don't know when will finish.
The purpose of the promise object is to allow for interested parties to get access to the result of the deferred task when it completes.

A new promise instance is created when a deferred instance is created and can be retrieved by calling deferred.promise.

#### Methods

* then(successCallback, errorCallback, notifyCallback) – regardless of when the promise was or will be resolved or rejected, then calls one of the success or error callbacks asynchronously as soon as the result is available. The callbacks are called with a single argument: the result or rejection reason. Additionally, the notify callback may be called zero or more times to provide a progress indication, before the promise is resolved or rejected.
This method returns a new promice which is resolved or rejected via the return value of the successCallback, errorCallback. It also notifies via the return value of the notifyCallback method. The promice can not be resolved or rejected from the notifyCallback method.


