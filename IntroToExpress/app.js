console.log("express")

var express = require("express")
var app = express()

// "/" => "Hi there!"
app.get("/", function(req, res){
	res.send("Hi there!")
})
// "/bye" => "bye!"
app.get("/bye", function(req, res){
	res.send("bye")
})

// "/dog" => "bye!"
app.get("/dog", function(req, res){
	res.send("Bark!!!")
})

app.get("/r/:subredditName", function(req, res) {
	console.log(req.params)
	var subreddit = req.params.subredditName
	res.send("this is a " + subreddit + " subreddit")
})
app.get("/r/:subreddit/comments/:id/:title", function(req, res) {
	res.send("this is a comment page")
})

app.get("*", function(req,res) {
	res.send("star matcher")
})

app.listen(process.env.PORT || 3000, process.env.IP, function(){
	console.log("Server has started!!!")
});

// app.listen(3000, function(){
// 	console.log("Server has started!!!")
// })

