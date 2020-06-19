var bodyParser = require("body-parser"),
	methodOverride = require("method-override"),
	expressSanitizer = require("express-sanitizer")
	mongoose = require("mongoose"),
	express = require("express"),
	fileUpload = require("express-fileupload"),
	app = express();

mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost/blog_app")
app.use(bodyParser.urlencoded({extended: true}))
app.use(expressSanitizer())
app.set("view engine", "ejs")
app.use(express.static("public"))
app.use(methodOverride("_method")) // treat post request as PUT/DELETE 
app.use(fileUpload())

// mongoose/model config
var blogSchema = new mongoose.Schema({
	title: String,
	image: String,
	body: String,
	imgFile: String,
	created: {type: Date, default: Date.now}
})
//title
//image
//body
//crested

var Blog = mongoose.model("Blog", blogSchema)

// Blog.create({
// 	title:  "Test Blog",
// 	image: "https://q-cf.bstatic.com/images/hotel/max1280x900/234/234843649.jpg",
// 	body: "This is a blog"
// }, function(err, blog){
// 	if(err) {
// 		console.log(err)
// 	} else {
// 		console.log("Created new blog:")
// 		console.log(blog)
// 	}
// })


// RESTFUl routes
app.get("/",  function(req, res){
	res.redirect("/blogs")
})

//Index route
app.get("/blogs",  function(req, res){
	Blog.find({},function(err, blogs){
		if(err){
			console.log(err)
		} else{
			res.render("index", {blogs: blogs})
		}
	})
	// res.render("index")
})

//NEW route
app.get("/blogs/new", function(req,res){
	res.render("new")
	
})

//CREATE
app.post("/blogs", function(req, res){
	var data = req.body
	console.log("=====data=====")
	console.log(data)
	
	var imgFile = req.files.imageFile
	console.log("======imageFile======")
	console.log(imgFile)
	
	imgFile.mv("public/"+imgFile.name, function(err){
		if(err){
			console.log("mv error")
		} else {
			console.log("File successfully uploaded")
		}
	})
	
	//create blog
	// console.log(req.body)
	// req.body.blog.body = req.sanitize(req.body.blog.body)
	// data.body =
	// console.log("==========")
	// console.log(req.body)
	Blog.create({
			title: data.title,
			image: data.image,
			imgFile: imgFile.name,
			body: data.body
	
		}, function(err, newBlog){
		if(err){
			console.log(err)
			res.render("new")
		} else {
			res.redirect("/blogs")
		}
	})
})


//SHOW
app.get("/blogs/:id", function(req, res){
	// res.send("show pages")
	Blog.findById(req.params.id, function(err, foundBlog){
		if(err){
			res.redirect("/blogs")
		} else {
			res.render("show",{blog: foundBlog})
		}
	})
})

//EDIT
app.get("/blogs/:id/edit", function(req, res){
	// res.render("edit")
	Blog.findById(req.params.id, function(err, foundBlog){
		if(err){
			res.redirect("/blogs")
		} else {
			res.render("edit",{blog: foundBlog})
		}
	})
})

//UPDATE
app.put("/blogs/:id", function(req, res){
	// res.render("edit")
	var data = req.body
	console.log("=====data=====")
	console.log(data)
	
	if(req.files != null) {
	var imgFile = req.files.imageFile
	console.log("======imageFile======")
	console.log(imgFile)
	
	imgFile.mv("public/"+imgFile.name, function(err){
		if(err){
			console.log("mv error")
		} else {
			console.log("File successfully uploaded")
		}
	})
		
	Blog.findByIdAndUpdate(req.params.id, {
		title: data.title,
		image: data.image,
		imgFile: imgFile.name,
		body: data.body
	}, function(err, updatedBlog){	
		if(err){
			res.redirect("/blogs")
		} else {
			res.redirect("/blogs/"+req.params.id)
		}
	})	
	} else {


	// req.body.blog.body = req.sanitize(req.body.blog.body)
	// Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
	Blog.findByIdAndUpdate(req.params.id, {
		title: data.title,
		image: data.image,
		// imgFile: imgFile.name,
		body: data.body
	}, function(err, updatedBlog){	
		if(err){
			res.redirect("/blogs")
		} else {
			res.redirect("/blogs/"+req.params.id)
		}
	})
	}
})

//DELETE route
app.delete("/blogs/:id", function(req, res){
	// res.render("edit")
	Blog.findByIdAndRemove(req.params.id, function(err){
		if(err){
			res.redirect("/blogs")
		} else {
			res.redirect("/blogs")
		}
	})
})

app.listen(3000, function(){
	console.log("blog app server has started!!!")
})