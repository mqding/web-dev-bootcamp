var mongoose = require("mongoose")

mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost/blog_demo")
/* Data Embed */
/* GOAL: Associate user with post, user has post(s) */
/* One to Many */

// POST - title, content
var postSchema = new mongoose.Schema({
	title: String,
	content: String 
})

var Post = mongoose.model("Post", postSchema)

//USER  - email, name
var userSchema = new mongoose.Schema({
	email: String,
	name: String,
	posts: [postSchema] // array of posts, postSchema(defined first)
})

var User = mongoose.model("User", userSchema)




// var newUser = new User({
// 	email: "harry@gt.edu",
// 	name: "Harry"
// })

// newUser.posts.push({
// 	title:"how to use java",
// 	content:"give up"
// })

// newUser.save(function(err, user){
// 	if(err){
// 		console.log(err)
// 	} else {
// 		console.log(user)
// 	}
// })

// var newPost = new Post({
// 	title: "recipe",
// 	content: "they are easy"
// })

// newPost.save(function(err, post){
// 	if(err){
// 		console.log(err)
// 	} else {
// 		console.log(newPost)
// 	}
// })

User.findOne({name:"Harry"}, function(err, user){
	if(err){
		console.log(err)
	} else {
		// console.log(user)
		user.posts.push({
			title: "things",
			content: "hahaha"
			
		})
		user.save(function(err, user){
			if(err) {
				console.log(err)
			} else {
				console.log(user)
			}
		})
	}
})