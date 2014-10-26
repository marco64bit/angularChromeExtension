<h1>Ajax wrapper</h1>

here you have an example of chrome extension application build with Yeoman generator with Ajax wrapper for services

<h3>Try example</h3>

load app folder as chrome extension in chrome browser options->extension


<h3> usage</h3>
<h4>include in your manifest </h4>
<pre>
...
"background": {
    "scripts": [
      "scripts/vendor/angular_extension.js", // ajax wrapper
      "scripts/services/contentscriptService.js", // your services
      "scripts/background.js"
    ],
    ....
    }
    ....
    "content_scripts": [
    {
      "js": [
        "scripts/vendor/angular_extension.js", // ajax wrapper
        "scripts/services/contentscriptService.js", // your services
      ],
      ...
    }

</pre>

<h4>your background.js</h4>

<pre>
myservice1();
myservice2();
...
myserviceN();
serviceExecution(); // create wrapper for background
</pre>

<h4>a service example</h4>

<pre>
var contentService = function() {
	$bg.$add("contentService", {
		func1: function (args) {
			$ajax(args) // pseudo code if you use jquery (angular integration work in progress)
			.success(function(data) {
			  return $cs.$success(data)
			})
			.error(function(data) {
			  return $cs.$error("error message here!")
			})
		}
		// other functions...
	})
	return $bg.contentService2;
}
</pre>

ok ok ok ... stop
contentService is the name of your service, you must add all method of service to ajax wrapper with this line and return it
<pre>
$bg.$add("nameOfService", {
  method1 : function() ...
  method2: function() ....
}
return $bg.nameOfService;
</pre>

to simulate a real callback you must use $cs (content script) 
<pre>
return $cs.$success(result)  // for success callback
			
return $cs.$error(errorMessage) // for error callback
</pre>
 
 <h4>content script code</h4>
 to use your service's method you can call it simple but adding "._" after method name and ajax wrapper is happy! :)
 <pre>
var service1 = service1Service();
var service2 = service2Service();

function success(data) {
	console.log("success ", data)
}
function error(data) {
	console.log("error ", data)
}

service1.func1._({title:"hello!"}, success, error);

service1.func2._({ad1:5, ad2:5}, success, error);
service2.func1._({ad1:10, ad2:2}, success, error);
service2.func1._({ad1:"wrong type string", ad2:2}, success, error);
 </pre>

