var express    = require("express"),
    app        = express(),
     bodyParser  =require("body-parser"),
     mongoose  = require("mongoose"),
    flash = require("connect-flash"),     
     passport   =require("passport"),
     User       =require("./models/user"),
     LocalStrategy =require("passport-local"),
     methodOverride = require("method-override"),
     passportLocalMongoose=require("passport-local-mongoose"),
     Campground = require("./models/campground"),
     Comment =require("./models/comment"),
     seedDB = require("./seeds");


var commentRoutes = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    authRoutes = require("./routes/auth");
    
mongoose.connect("mongodb://127.0.0.1:27017/yelp_camp",{useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true, useUnifiedTopology: true});

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

//seedDB();
//passport setup

app.use(require("express-session")({
    secret: " Yelpcamp authentication",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



app.use(function(req , res ,next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

// Campground.create(
//     {
//         name: "Grill Hill",
//         image: "https://www.google.com/imgres?imgurl=https%3A%2F%2Fwww.reserveamerica.com%2Fwebphotos%2Fracms%2Farticles%2Fimages%2Ffef91bb3-1dff-444d-b0e5-d14db129ce1d_image2_0-main-tent.jpg&imgrefurl=https%3A%2F%2Fwww.reserveamerica.com%2Farticles%2Fcamping%2F10-cool-tent-camping-destinations&tbnid=JOA6EiAWAtA9NM&vet=12ahUKEwik15ue4ZfoAhVghEsFHXShCiEQMygKegUIARDHAg..i&docid=9gvX6u-2Uz6caM&w=620&h=351&q=camping%20images&ved=2ahUKEwik15ue4ZfoAhVghEsFHXShCiEQMygKegUIARDHAg",
//         description :"this is a huge grill hile . No bathroom . Beautiful hills."
       
//     }, function(err,campground){
//         if(err){
//             console.log("ERROR"+err);
//         }
//         else{
//             console.log("Added "+ campground);
//         }
//     }
// );

//==========================================================
//==========================================================
//v1 array usage
// var campgrounds= [
//     {name : "salmon creeks", image :"https://www.google.com/imgres?imgurl=https%3A%2F%2Fwww.reserveamerica.com%2Fwebphotos%2Fracms%2Farticles%2Fimages%2Ffef91bb3-1dff-444d-b0e5-d14db129ce1d_image2_0-main-tent.jpg&imgrefurl=https%3A%2F%2Fwww.reserveamerica.com%2Farticles%2Fcamping%2F10-cool-tent-camping-destinations&tbnid=JOA6EiAWAtA9NM&vet=12ahUKEwik15ue4ZfoAhVghEsFHXShCiEQMygKegUIARDHAg..i&docid=9gvX6u-2Uz6caM&w=620&h=351&q=camping%20images&ved=2ahUKEwik15ue4ZfoAhVghEsFHXShCiEQMygKegUIARDHAg "},
//     {name : "grill hill ", image :" https://www.google.com/imgres?imgurl=https%3A%2F%2Fwww.reserveamerica.com%2Fwebphotos%2Fracms%2Farticles%2Fimages%2Ffef91bb3-1dff-444d-b0e5-d14db129ce1d_image2_0-main-tent.jpg&imgrefurl=https%3A%2F%2Fwww.reserveamerica.com%2Farticles%2Fcamping%2F10-cool-tent-camping-destinations&tbnid=JOA6EiAWAtA9NM&vet=12ahUKEwik15ue4ZfoAhVghEsFHXShCiEQMygKegUIARDHAg..i&docid=9gvX6u-2Uz6caM&w=620&h=351&q=camping%20images&ved=2ahUKEwik15ue4ZfoAhVghEsFHXShCiEQMygKegUIARDHAg"},
//     {name : "mountain yes", image :" https://www.google.com/imgres?imgurl=https%3A%2F%2Fwww.reserveamerica.com%2Fwebphotos%2Fracms%2Farticles%2Fimages%2Ffef91bb3-1dff-444d-b0e5-d14db129ce1d_image2_0-main-tent.jpg&imgrefurl=https%3A%2F%2Fwww.reserveamerica.com%2Farticles%2Fcamping%2F10-cool-tent-camping-destinations&tbnid=JOA6EiAWAtA9NM&vet=12ahUKEwik15ue4ZfoAhVghEsFHXShCiEQMygKegUIARDHAg..i&docid=9gvX6u-2Uz6caM&w=620&h=351&q=camping%20images&ved=2ahUKEwik15ue4ZfoAhVghEsFHXShCiEQMygKegUIARDHAg"}

// ];

//==========================================================
//==========================================================


//lnding page
app.get("/",function(req , res){
    
    res.render("landing");
    
 });

app.use("/", authRoutes);
app.use("/campgrounds/:id/comments/" , commentRoutes);
app.use("/campgrounds" , campgroundRoutes);



//====================

app.listen(3000,function(){
    console.log("yelpcamp started");
});