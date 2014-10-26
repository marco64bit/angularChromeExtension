'use strict';

console.log('\'Allo \'Allo! Content script');
var service1 = contentService();
var service2 = contentService2();
var google = googleService();

function success(data) {
	console.log("successo ", data)
}
function error(data) {
	console.log("error ", data)
}

service1.func1._({title:"hello!"}, success, error);

service1.func2._({ad1:5, ad2:5}, success, error);
service2.func1._({ad1:10, ad2:2}, success, error);
service2.func1._({ad1:"ops non sono un numero", ad2:2}, success, error);
//google.get._();
