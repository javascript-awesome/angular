# Providing communications with the remote HTTP using Angular

## For providing communications with the remote HTTP servers angular has several methods:

* <a href='#http'>$http service</a>
* <a href='#resource'>$resource service</a>

## $http API is based on
* <a href='#deferred'>deferred</a>
* <a href='#promise'>promise</a>

### <a name='http'>$http service</a>

As for me $http service is the simplest and clearest service for HTTP communication purpose.
The $http API is based on the deferred/promise APIs exposed by the $q service. About that we will talk later. 

So how can we use this servise and what properties does it have?

Just imagine we want to send request  and get all information about our customers. 
#### For this case we need write:
'''html
$http({method: 'GET', url: '/customers'}).
  success(function(data, status, headers, config) {
    // this callback will be called asynchronously
    // when the response is available
    console.log(data);
  }).
  error(function(error, status, headers, config) {
    // called asynchronously if an error occurs
    // or server returns response with an error status.
    console.log(error, status);
  });
'''

#### OR (simple form)

$http.get('/customers').success(function(data, status, headers, config) {
    console.log(data);
  }).
  error(function(error, status, headers, config) {
    console.log(error, status);
  }
);

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

### <a name='resource'>$resource service</a>

