var express = require("express")
var app = express()

app.use(express.static("public"))
app.set("view engine", "ejs") // set, so that expect ejs file as default

app.get("/", function(req, res) {
	//
	res.render("home.ejs")
	// res.send("Welcome to home page")
})

app.get("/inlove/:thing", function(req, res){
	var thing = req.params.thing
	res.render("love.ejs", {thingVar: thing}) //tell ejs the varaiable
})

app.get("/posts", function(req, res){
	var posts = [
		{title: "Post 1", author: "Susy"},
		{title: "Post 2", author: "Adam"},
		{title: "Post 3", author: "Cindy"}
	]
	
	res.render("posts.ejs", {posts: posts})
})

app.listen(3000, function(){
	console.log("Server has started!!!")
})