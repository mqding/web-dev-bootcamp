var express = require("express");
var router  = express.Router();
var Campground = require("../models/campground");

//INDEX
router.get("/", (req, res) => {
	//console.log(req.user) //{ _id: 5ee7de95c729ee0c24cdef9e, username: '1111', __v: 0 }
	//retrive data from mongoDB
	Campground.find({}, function(err, allCampgrounds) {
		if(err) {
			console.log(err)
		} else {
			res.render("campgrounds/index", {grounds: allCampgrounds}) 
		}
	})
})

//name      url      verb     description  
//===========================================================
//INDEX    /dogs     GET      Display all 
//NEW      /dogs/new GET      Display form to make a new dog
//CREATE   /dogs     POST     Add new dog to DB
//SHOW     /dogs/:id GET      Show infeo about one dog 

/* add comment route (nested) */
//NEW    campgrounds/:id/comments/new    GET
//CREATE campgrounds/:id/comments        POST


//CREATE 
router.post("/", (req, res) => {
	// res.send("You hit the post route")
	var name = req.body.name
	var image = req.body.image
	var desc = req.body.description 
	var newCampground = {name: name, image: image, description: desc}
	
	//Create a newCampground and save to mongoDB
	Campground.create(newCampground, function(err, newlyCreated){
		if(err) {
			console.log(err);
		} else {
			res.redirect("/campgrounds")//redirect to campground page
		}
	})
})

//NEW
router.get("/new", (req, res)=>{
	res.render("campgrounds/new")
})

//SHOW
router.get("/:id", function(req, res) {
	//find the campground with specific id
	Campground.findById(req.params.id,).populate("comments").exec(function(err, foundCampground) {
		if(err) {
			console.log(err)
		} else {
			console.log(foundCampground)// contains the comments array
			res.render("campgrounds/show", {campground: foundCampground})	
		}
	})
	req.params.id
})
module.exports = router;