var express = require("express")
var app = express()
var bodyParser = require("body-parser")

app.use(bodyParser.urlencoded({extended: true}))

app.use(express.static("public"))
app.set("view engine", "ejs") // set, so that expect ejs file as default

var friends = ["Susy", "Adam", "Cindy"]


app.get("/", function(req, res) {
	res.render("home")
	// res.send("Welcome to home page")
})

app.get("/friends", function(req, res){
	res.render("friend", {friends: friends})
})


app.post("/addfriend", function(req, res){
	var newFriend = req.body.newfriend
	friends.push(newFriend)
	// res.send("POST ROUTE")
	res.redirect("/friends")
})


app.listen(3000, function(){
	console.log("Server has started!!!")
})