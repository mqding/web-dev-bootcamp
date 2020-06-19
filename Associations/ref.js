var mongoose = require("mongoose")

mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost/blog_demo_2")
/* Object Referencing: reference post using post id */
/* GOAL: Associate user with post, user has post(s) */
/* One to Many */

// POST - title, content
// var postSchema = new mongoose.Schema({
// 	title: String,
// 	content: String 
// })

// var Post = mongoose.model("Post", postSchema)

var Post = require("./models/post")

//USER  - email, name
// var userSchema = new mongoose.Schema({
// 	email: String,
// 	name: String,
// 	posts: [
// 		{
// 			type: mongoose.Schema.Types.ObjectId,
// 			ref: "Post"
// 		}
// 	] // array of objId
// })

// var User = mongoose.model("User", userSchema)

var User = require("./models/user")


// User.create({
// 	email:"bob@gmail.com",
// 	name: "bob"
// })

// Post.create({
// 	title: "how to cook pt.1",
// 	content:"blah blah"
// }, function(err, post){
// 	User.findOne({email:"bob@gmail.com"}, function(err, user){
// 		if(err){
// 			console.log(err)
// 		} else {
// 			user.posts.push(post)
// 			user.save(function(err, data){
// 				if(err){
// 					console.log(err)
// 				} else {
// 					console.log(data)
// 				}
// 			})
// 		}
// 	})
// })


//Find user
//find all the post for that user
User.findOne({email:"bob@gmail.com"}).populate("posts").exec(function(err,user){
	if(err){
		console.log(err)
	} else {
		console.log(user)
	}
})
