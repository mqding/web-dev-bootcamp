var express = require("express");
var router  = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");

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
router.post("/", middleware.isLoggedIn, (req, res) => {
	// res.send("You hit the post route")
	var name = req.body.name
	var price = req.body.price
	var image = req.body.image
	var desc = req.body.description
	var author = {
		id: req.user._id,
		username: req.user.username
	}
	var newCampground = {name: name, price: price, image: image, description: desc, author: author}
	
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
router.get("/new", middleware.isLoggedIn, (req, res)=>{
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

//EDIT - since v10
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
        res.render("campgrounds/edit", {campground: foundCampground});
    });
});

//UPDATE - since v10
router.put("/:id",middleware.checkCampgroundOwnership, function(req, res){
    // find and update the correct campground
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
       if(err){
           res.redirect("/campgrounds");
       } else {
           //redirect somewhere(show page)
           res.redirect("/campgrounds/" + req.params.id);
       }
    });
});

// DESTROY CAMPGROUND ROUTE - since v10
router.delete("/:id",middleware.checkCampgroundOwnership, function(req, res){
   Campground.findByIdAndRemove(req.params.id, function(err){
      if(err){
          res.redirect("/campgrounds");
      } else {
          res.redirect("/campgrounds");
      }
   });
});

module.exports = router;