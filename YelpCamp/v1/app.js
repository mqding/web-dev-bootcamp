var express = require("express")
var app = express()
// var request = require("request")
var bodyParser = require("body-parser")

var campgrounds = [
		{name: "site 1", image:"https://q-cf.bstatic.com/images/hotel/max1280x900/234/234843649.jpg"},
		{name: "site 2", image:"https://q-cf.bstatic.com/images/hotel/max1280x900/234/234943723.jpg"},
		{name: "site 3", image:"https://q-cf.bstatic.com/images/hotel/max1280x900/234/234943701.jpg"}
	]


app.use(bodyParser.urlencoded({extended: true}))
app.set("view engine", "ejs")


app.get("/", (req,res) => {
	res.render("landing")
})

app.get("/campgrounds", (req, res) => {
	res.render("campgrounds", {grounds: campgrounds}) 
})


app.post("/campgrounds", (req, res) => {
	// res.send("You hit the post route")
		//get data from from and add to campgrounds array
	var name = req.body.name
	var image = req.body.image
	var newCampground = {name: name, image: image}
	campgrounds.push(newCampground)

	//redirect to campground page
	res.redirect("/campgrounds")	
})


app.get("/campgrounds/new", (req, res)=>{
	res.render("new")
})
// app.get("/results", (req, res) =>{
// 	var query = req.query.search
// 	request("http://www.omdbapi.com/?s="+query+"&apikey=thewdb", (error, response, body) => {
// 		if(!error && response.statusCode ==200){
// 			const results = JSON.parse(body)
// 			res.render("results", {data: results}) //data is the var used in ejs
// 			// res.send(`${results.Title}, rating ${results.imdbRating}`)
// 		}
// 	})
// 	// res.send("Hello, it works")
// })




app.listen(3000, function(){
	console.log("YelpCamp server has started!!!")
})