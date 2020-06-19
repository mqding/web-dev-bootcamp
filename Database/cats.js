var mongoose = require("mongoose");
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
//first connect the database
mongoose.connect("mongodb://localhost/cat_app")

var catSchema = new mongoose.Schema({
	name: String,
	age: Number,
	temperament: String
});

var Cat = mongoose.model("Cat", catSchema) // collection called Cat(singular version)


//add a new cat to the DB
// var george = new Cat({
// 	name: "George",
// 	agr: 11,
// 	temperament : "Grouchy"
// })


// var george = new Cat({
// 	name: "Mrs. Norris",
// 	agr: 7,
// 	temperament : "Evil"
// })

// george.save(function(err, cat){ // add a call back funtion
// 	if(err) {
// 		console.log("error")
// 	} else {
// 		console.log("successfully saved");
// 		console.log(cat);
// 	}
// })

// create

Cat.create({
	name: "Snoe White",
	age: 15,
	temperament: "Blind"
}, function(err, cat) {
		if(err) {
			console.log("error");
			console.log(err)
	} else {
		console.log("successfully saved");
		console.log(cat);
	}
})

//retrieve all cats
Cat.find({}, function(err, cats){
	if(err) {
		console.log("error")
		console.log(err);
	} else {
		console.log("All cats found:")
		console.log(cats)
		
	}
})