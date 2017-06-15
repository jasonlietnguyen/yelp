var express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose"),
  port = 4000


mongoose.connect("mongodb://yelp:yelp@ds127892.mlab.com:27892/yelp123")


// Schema
var campgroundSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String
})
var Campground = mongoose.model("Campground", campgroundSchema)


app.use(bodyParser.urlencoded({ extended: true }))
app.set("view engine", "ejs");


Campground.create({ name: "Salmon Lake", image: "https://static.pexels.com/photos/198534/pexels-photo-198534.jpeg", description: "jlda ;fd ja'sdf sdjfl akjsdf ;lakjsd;f asdjfi jas;dfj ;oaeirh erj gshdf o" }, function (err, req) {
  if (err) {
    console.log(err)
  } else {
    console.log(req)
    // res.redirect("/campgrounds")
  }
})











app.get("/", function (req, res) {
  res.render("landing")
})

// Show All Campgrounds
app.get("/campgrounds", function (req, res) {
  Campground.find({}, function (err, req) {
    if (err) {
      console.log(err)
    } else {
      res.render("index", { campgrounds: req })
    }
  })
})


// Show form to add to database
app.get("/campgrounds/new", function (req, res) {
  res.render("new")
})

// Add new campground to database
app.post("/campgrounds", function (req, res) {
  Campground.create({ name: req.body.name, image: req.body.image }, function (err, req) {
    if (err) {
      console.log(err)
    } else {
      console.log(req)
      res.redirect("/campgrounds")
    }
  })
})

// Show
app.get("/campgrounds/:id", function (req, res) {
  Campground.findById( req.params.id, function (err, req) {
    if (err) {
      console.log(err)
    } else {
      console.log(req)
      res.render("show", {campground: req})
    }
  })
})

app.listen(port, function (req, res) {
  console.log("App is listening on port: ", port)
})

// var campgrounds = [
//   { name: "Tuna Creek", image: "https://static.pexels.com/photos/188940/pexels-photo-188940.jpeg" },
//   { name: "Rock Mountain", image: "https://static.pexels.com/photos/25543/pexels-photo-25543.jpg" },
//   { name: "Turtle Lake", image: "https://static.pexels.com/photos/198979/pexels-photo-198979.jpeg" },
//   { name: "Tuna Creek", image: "https://static.pexels.com/photos/30915/pexels-photo-30915.jpg" },
//   { name: "Rock Mountain", image: "https://static.pexels.com/photos/192518/pexels-photo-192518.jpeg" },
//   { name: "Turtle Lake", image: "https://static.pexels.com/photos/45241/tent-camp-night-star-45241.jpeg" }
// ]