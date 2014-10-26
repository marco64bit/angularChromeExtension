var baseUrl = "auth/test"

angular.module('myapp', []).factory('ExampleService', ["$resource",  function($resource) {
    return $resource(baseUrl, {}, {
		"test": {
			method: "GET",
			url: "http://google.com"
		}
	});
}]);