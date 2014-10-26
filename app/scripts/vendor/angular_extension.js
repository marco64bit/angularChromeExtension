// content script utilities 
var obj = function(title) {
	this.title = title;
	this._ = function(data, success, error) {
		chrome.runtime.sendMessage({
			"execute_service": this.title,
			"arguments": JSON.stringify(arguments)
		},function(data){
			data.status == "success" ? success(data) : error(data)
		})
	}
}

var $bg = {
	$add: function (serviceName, serviceFunctions) {
		console.log("bg add ", serviceName)
		for (var serviceFunctionName in serviceFunctions) {
			if(! (serviceName in BACKGROUND_SERVICES)) {
				BACKGROUND_SERVICES[serviceName] = {}
			}
			BACKGROUND_SERVICES[serviceName][serviceFunctionName] = serviceFunctions[serviceFunctionName];
			var o = new obj(serviceName + "/" + serviceFunctionName)
			serviceFunctions[serviceFunctionName] = o;
		}
		this[serviceName] = serviceFunctions;
	}
}

/* background utilities */
var BACKGROUND_SERVICES = {};

var $cs = {
	$success: function(data) {
		return {"status": "success", "data":data}
	},
	$error: function(data) {
		return {"status": "error", "data":data}
	}
}

function serviceExecution(port) {
	chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	  	if(request.execute_service) {
	  		//come capisco che sono messaggi del framework TODO migliorare!!! (attraverso porta non si può fare :|)
	  		sendResponse(parseRequest(request));
	  	}
	});
}

function parseRequest () {
	var nodeDeep = arguments[0].execute_service.split("/");
	var array_args = [];
	var obj_args = JSON.parse(arguments[0].arguments);
	for (var key in obj_args) {
		array_args.push(obj_args[key])
	}
	return BACKGROUND_SERVICES[nodeDeep[0]][nodeDeep[1]].apply(this, array_args);
}