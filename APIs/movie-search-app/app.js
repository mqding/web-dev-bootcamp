var express = require("express")
var app = express()
var request = require("request")

app.set("view engine", "ejs")

app.get("/results", (req, res) =>{
	var query = req.query.search
	request("http://www.omdbapi.com/?s="+query+"&apikey=thewdb", (error, response, body) => {
		if(!error && response.statusCode ==200){
			const results = JSON.parse(body)
			res.render("results", {data: results}) //data is the var used in ejs
			// res.send(`${results.Title}, rating ${results.imdbRating}`)
		}
	})
	// res.send("Hello, it works")
})

app.get("/", (req,res) => {
	res.render("search")
})


app.listen(3000, function(){
	console.log("Movie app has started!!!")
})