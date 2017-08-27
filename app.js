var express             =   require("express");
var request             =   require("request");
var bodyParser          =   require("body-parser");
var mongoose            =   require("mongoose");
var Campground          =   require("./models/campgrounds");
var Comment             =   require("./models/comments");
var SeedDB              =   require("./seeds")
var User                =   require("./models/user")
var app                 =   express();
var passport            =   require("passport");
var LocalStrategy       =   require("passport-local");
var commentRoutes       =   require("./routes/comments");
var campgroundRoutes    =   require("./routes/campgrounds");
var indexRoutes         =   require("./routes/index");


app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
//db setup
//mongoose.connect("mongodb://localhost/yelp_camp");
mongoose.connect("mongodb://shreyasdb:shreyas123@ds151153.mlab.com:51153/yelpcampnew");

//SeedDB();

app.use(express.static(__dirname+"/public"));



//passport config
app.use(require("express-session")(
    {
    secret :"campers",
    resave :false,
    saveUninitialized :false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use(function(req,res,next){
   res.locals.currentUser = req.user;
   next();
});//middleware//whatever we give in res.locals will be available niside template



app.use("/",indexRoutes);
app.use("/campgrounds",campgroundRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);



app.listen(process.env.PORT,process.env.IP ,function(){
    console.log("yelp camp is up");
});