var request = require('request')
request('http://www.google.com', function(error, response, body ){
	eval(require('locus'))
	if(!error && response.statusCode ==200) {
		var parsedData = JSON.parse(body)
		console.log(parsedData[""])
	}
})