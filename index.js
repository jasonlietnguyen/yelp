var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    port = 4000


mongoose.connect("mongodb://yelp:yelp@ds127892.mlab.com:27892/yelp123")

var campgroundSchema = new mongoose.Schema({
  name: String,
  image: String
})

var Campground = mongoose.model("Campground", campgroundSchema)

Campground.create({ name: "Tuna Creek", image: "https://static.pexels.com/photos/188940/pexels-photo-188940.jpeg" }, function (err, req) {
  if(err){
    console.log(err)
  }else{
    console.log(req)
  }
})


var campgrounds = [
  { name: "Tuna Creek", image: "https://static.pexels.com/photos/188940/pexels-photo-188940.jpeg" },
  { name: "Rock Mountain", image: "https://static.pexels.com/photos/25543/pexels-photo-25543.jpg" },
  { name: "Turtle Lake", image: "https://static.pexels.com/photos/198979/pexels-photo-198979.jpeg" },
  { name: "Tuna Creek", image: "https://static.pexels.com/photos/30915/pexels-photo-30915.jpg" },
  { name: "Rock Mountain", image: "https://static.pexels.com/photos/192518/pexels-photo-192518.jpeg" },
  { name: "Turtle Lake", image: "https://static.pexels.com/photos/45241/tent-camp-night-star-45241.jpeg" }
]
app.use(bodyParser.urlencoded({extended: true}))
app.set("view engine", "ejs");

app.get("/", function (req, res) {
  res.render("landing")
})

app.get("/campgrounds", function (req, res) {
  res.render("campgrounds", { campgrounds: campgrounds })
})

app.get("/campgrounds/new", function (req, res) {
  res.render("new")
})

app.post("/campgrounds", function (req, res) {
  campgrounds.push({name: req.body.name, image: req.body.image})
  res.redirect("/campgrounds")
})


app.listen(port, function (req, res) {
  console.log("App is listening on port: ", port)
})
