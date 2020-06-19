var express = require("express")
var app = express()
// var request = require("request")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")
var Campground = require("./models/campground")

var seedDB = require("./seeds")

seedDB();
	// Comment = require("./models/comment")
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
//first connect the database
mongoose.connect("mongodb://localhost/yelp_camp_v3")
app.use(bodyParser.urlencoded({extended: true}))
app.set("view engine", "ejs")





// Campground.create(
// 	{
// 		name: "site 1", 
// 		image:"https://q-cf.bstatic.com/images/hotel/max1280x900/234/234843649.jpg",
// 		description:"This is a huge hill, no bathrooms"
// 	}, function(err, campground) {
// 		if(err) {
// 			console.log(err)
// 		} else {
// 			console.log("Created campground:")
// 			console.log(campground)
// 		}
// 	}
// )

var campgrounds = [
		{name: "site 1", image:"https://q-cf.bstatic.com/images/hotel/max1280x900/234/234843649.jpg"},
		{name: "site 2", image:"https://q-cf.bstatic.com/images/hotel/max1280x900/234/234943723.jpg"},
		{name: "site 3", image:"https://q-cf.bstatic.com/images/hotel/max1280x900/234/234943701.jpg"}
	]

app.get("/", (req,res) => {
	res.render("landing")
})


//INDEX
app.get("/campgrounds", (req, res) => {
	//retrive data from mongoDB
	Campground.find({}, function(err, allCampgrounds) {
		if(err) {
			console.log(err)
		} else {
			res.render("index", {grounds: allCampgrounds}) 
		}
	})
	
	// res.render("campgrounds", {grounds: campgrounds}) 
})

//add description to our campground model
//show db.collection.drop()
//add a show route/template

//name      url      verb     description  
//===========================================================
//INDEX    /dogs     GET      Display all 
//NEW      /dogs/new GET      Display form to make a new dog
//CREATE   /dogs     POST     Add new dog to DB
//SHOW     /dogs/:id GET      Show infeo about one dog 


//CREATE 
app.post("/campgrounds", (req, res) => {
	// res.send("You hit the post route")
	//get data from from and add to campgrounds array
	var name = req.body.name
	var image = req.body.image
	var desc = req.body.description 
	var newCampground = {name: name, image: image, description: desc}
	
	// campgrounds.push(newCampground)
	
	//Create a newCampground and save to mongoDB
	Campground.create(newCampground, function(err, newlyCreated){
		if(err) {
			console.log(err);
		} else {
			res.redirect("/campgrounds")	
		}
	})

	//redirect to campground page
	// res.redirect("/campgrounds")	
})

//NEW
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

//SHOW
app.get("/campgrounds/:id", function(req, res) {
	//find the campground with specific id
	Campground.findById(req.params.id, function(err, foundCampground) {
		if(err) {
			console.log(err)
		} else {
			res.render("show", {campground: foundCampground})	
		}
	})
	req.params.id
	// res.send("it will be the show page")
	// res.render("show")
})


app.listen(3000, function(){
	console.log("YelpCamp server has started!!!")
})