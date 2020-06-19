var express = require("express");
var router = express.Router({mergeParams: true}); 
// mergerParams allow this route to access the :id in app.js
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware");//automatically require index.js 
//==================
//Comment Routes
//==================

router.get("/new", middleware.isLoggedIn, function(req, res) {
	Campground.findById(req.params.id, function(err, campground){
		if(err){
			console.log(err)
		} else {
			res.render("comments/new", {campground: campground})
		}
	})
})

router.post("/", middleware.isLoggedIn, function(req, res) {
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
					//add username and id to comment and save
					comment.author.id = req.user._id
					comment.author.username = req.user.username;
					comment.save()
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

// COMMENT EDIT ROUTE
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
   Comment.findById(req.params.comment_id, function(err, foundComment){
      if(err){
          res.redirect("back");
      } else {
        res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});
      }
   });
});

// COMMENT UPDATE
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
   Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
      if(err){
          res.redirect("back");
      } else {
          res.redirect("/campgrounds/" + req.params.id );
      }
   });
});

// COMMENT DESTROY ROUTE
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    //findByIdAndRemove
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
       if(err){
           res.redirect("back");
       } else {
           res.redirect("/campgrounds/" + req.params.id);
       }
    });
});

module.exports = router;