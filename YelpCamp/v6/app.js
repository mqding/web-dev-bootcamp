var express = require("express"),
	app     = express(),
	bodyParser = require("body-parser"),
	mongoose   = require("mongoose"),
	passport   = require("passport"),
	LocalStrategy = require("passport-local"),
	Campground = require("./models/campground"),
	Comment    = require("./models/comment"),
	User       = require("./models/user"),
	seedDB     = require("./seeds")

seedDB();
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost/yelp_camp_v6")
app.use(bodyParser.urlencoded({extended: true}))
app.set("view engine", "ejs")
app.use(express.static(__dirname + "/public"))

// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Once again Rusty wins cutest dog!",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate())); //method from passport-local-mongoose
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// pass currentUser to every route?
// avoid currentUser undefined
app.use(function(req, res, next){
	res.locals.currentUser = req.user
	next()
})


app.get("/", (req,res) => {
	res.render("landing")
})

//INDEX
app.get("/campgrounds", (req, res) => {
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
app.post("/campgrounds", (req, res) => {
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
app.get("/campgrounds/new", (req, res)=>{
	res.render("campgrounds/new")
})

//SHOW
app.get("/campgrounds/:id", function(req, res) {
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

//==================
//Comment Routes
//==================

app.get("/campgrounds/:id/comments/new", isLoggedIn, function(req, res) {
	Campground.findById(req.params.id, function(err, campground){
		if(err){
			console.log(err)
		} else {
			res.render("comments/new", {campground: campground})
		}
	})
})

app.post("/campgrounds/:id/comments", function(req, res) {
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

//==============
// AUTH ROUTES
//==============

//show the register form
app.get("/register", function(req, res){
   res.render("register"); 
});
//handle sign up logic
app.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){ //take 3 params
        if(err){
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
           res.redirect("/campgrounds"); 
        });
    });
});

// show login form
app.get("/login", function(req, res){
   res.render("login"); 
});
// handling login logic using passport middleware
app.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/campgrounds",
        failureRedirect: "/login"
    }), function(req, res){
});

// logout route
app.get("/logout", function(req, res){
   req.logout();
   res.redirect("/campgrounds");
});

// if not logged in, not allowed to write reviews
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}



app.listen(3000, function(){
	console.log("YelpCamp server has started!!!")
})