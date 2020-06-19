var express = require("express");
var router  = express.Router({mergeParams: true}); 
// mergerParams allow this route to access the :id in app.js
var Campground = require("../models/campground");
var Comment = require("../models/comment");
//==================
//Comment Routes
//==================

router.get("/new", isLoggedIn, function(req, res) {
	Campground.findById(req.params.id, function(err, campground){
		if(err){
			console.log(err)
		} else {
			res.render("comments/new", {campground: campground})
		}
	})
})

router.post("/", function(req, res) {
	//look up campground by id
	Campground.findById(req.params.id, function(err, campground){
		if(err){
			console.log(err)
			res.redirect("/campgrounds")
		} else {
			//create new comment
			console.log(req.body.comment)
			Comment.create(req.body.comment, function(err, comment){
				if(err){
					console.log(err)
				} else {
					//connect new comment to campground
					campground.comments.push(comment)
					campground.save()
					//redirect to campground show page
					res.redirect("/campgrounds/" + campground._id)
				}
			})
		}
	})
})

// if not logged in, not allowed to write reviews
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;