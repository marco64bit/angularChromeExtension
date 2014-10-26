var contentService = function() {
	$bg.$add("contentService", {
		func1: function (args) {
			console.info("contentService func1 ", args.title)
			return $cs.$success(args.title + " yep")
		},
		func2: function (args) {
			console.info("contentService func2 ", args.ad1 + args.ad2)
			return $cs.$success(args.ad1 + args.ad2)
		}
		// tutte le mie funzioni di questo servizio 
	});
	return $bg.contentService;
}

var contentService2 = function() {
	$bg.$add("contentService2", {
		func1: function (args) {
			console.log("contentService2 fun1", args.ad1 - args.ad2)
			var result = args.ad1 - args.ad2;
			if (result) {
				return $cs.$success(result)
			}else {
				return $cs.$error("devi inserire valori numerici")
			}
		}
		// tutte le mie funzioni di questo servizio 
	})
	return $bg.contentService2;
}

var googleService = function() {
	$bg.$add("googleService", {
		get: function () {
			$http.get("http://google.com").success(function(data){
				console.log("success", data)
				return $cs.$success(data);
			})
			.error(function(data) {
				console.log("google is down")
				return $cs.$error(data);
			})
		}
		// tutte le mie funzioni di questo servizio 
	})
	return $bg.googleService;
}

function serviceFactoryInit() {
	//aggiunge tutti i servizi per il background
	contentService();
	contentService2();
	googleService();
}