var app         = require("express")();
var request     = require("request");
var bodyParser  =require("body-parser");
var mongoose    = require("mongoose");

app.use(bodyParser.urlencoded({extended:true}))
app.set("view engine", "ejs");
mongoose.connect("mongodb://localhost/yelp_camp");

//schema setup

var campgroundSchema = new mongoose.Schema({
    name : String,
    img  : String,
    description : String
});

var Campground = mongoose.model("Campground",campgroundSchema);

// Campground.create(
//     {name : "purple trail ", 
//     img:"http://tremendouswallpapers.com/wp-content/uploads/2015/07/Fresh-atmosphere-computers-desktop-wallpaper-640x480.jpg",
//     description : "this is a huge reserve open with alot of wild life"},

//  function(err,campground)
//     {
//         if(err)
//         {console.log(err);}
//         else
//         {console.log("campgroud added ");
//             console.log(campground);
//         }
//     });


app.get("/",function(req,res){
   res.render("landing"); 
});

app.get("/campgrounds",function(req,res){
    Campground.find({},function(err,allCampground)
    {
        if(err)
        {console.log(err);}
        else
        {res.render("index",{campgrounds:allCampground});
        }
    })
    
});


app.get("/campgrounds/new",function(req,res)
{
    res.render("new");
    
});


app.post("/campgrounds", function(req,res){
    
 //var newcamp = JSON.parse(req.body.name);
 //console.log(newcamp);
 var name = req.body.name;
 var img = req.body.img;
 var description = req.body.description;
 var newcamp= {name :name ,img:img, description:description}
 
 Campground.create(newcamp, function(err,newlycamp)
 {
     if(err)
     {
         console.log(err);
     }
     else
     {
     res.redirect("/index");
       
     }
 })
 
});


app.get("/campgrounds/:id",function(req,res){
   Campground.findById(req.params.id, function(err,foundCampground)
   {
       if(err){console.log(err);}
       else
       {
        res.render("show", {campground:foundCampground});
        
       }
   }) 
   var campid = req.params.id;
});

app.listen(process.env.PORT,process.env.IP ,function(){
    console.log("yelp camp is up");
});