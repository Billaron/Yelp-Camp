var express = require("express")
var router = express.Router({mergeParams : true});
var Campground = require("../models/campgrounds");
var Comment = require("../models/comments");
var User = require("../models/user");
var middleware = require("../middleware/index")
var geocoder = require("geocoder");
var moment = require("moment");

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};


//=======
//Campgrounds Routes
//=======

//index
router.get("/",function(req,res){
    
    Campground.find({},function(err,allCampground)
    {
        if(err)
        {console.log(err);}
        else
        {res.render("campgrounds/index",{campgrounds:allCampground});
        }
    });
    
});

//new
router.get("/new",middleware.isLoggedIn,function(req,res)
{
    res.render("campgrounds/new");
    
});

//create
router.post("/", middleware.isLoggedIn,function(req,res){
    
 //var newcamp = JSON.parse(req.body.name);
 //console.log(newcamp);
var name = req.body.name;
var img = req.body.img;
var description = req.body.description;
var price  = req.body.price;
var author = { id :req.user.id, username :req.user.username};
geocoder.geocode(req.body.location, function (err, data) 
{
    var lat = data.results[0].geometry.location.lat;
    var lng = data.results[0].geometry.location.lng;
    var location = data.results[0].formatted_address;

var newcamp= {name :name ,img:img, description:description , author :author, price:price, location: location, lat: lat, lng: lng};
 
 Campground.create(newcamp, function(err,newlycamp)
 {
     if(err)
     {
         console.log(err);
     }
     else
     {
     res.redirect("/campgrounds");
       
     }
 });
 
});
});

//show
router.get("/:id",function(req,res){
   Campground.findById(req.params.id).populate("comments").exec(function(err,foundcampground){
       
       if(err)
       {console.log(err);}
       else
       {
        res.render("campgrounds/show",{campground:foundcampground});
        
       }
   }); 
});

//edit
router.get("/:id/edit",middleware.checkCampgroundOwnership,function(req,res){
    

     Campground.findById(req.params.id,function(err,campground){
        if (err)
        {
    
            res.redirect("/campground");
     }
     else{
          res.render("campgrounds/edit",{campground:campground});
            
        }
    });
    
    
});
//upadte

router.put("/:id",middleware.checkCampgroundOwnership, function(req,res)
{
    geocoder.geocode(req.body.location, function (err, data) {
        if (err)
        {console.log(err)}
        else {
        var lat = data.results[0].geometry.location.lat;
        var lng = data.results[0].geometry.location.lng;
        var location = data.results[0].formatted_address;
        var newData = {name: req.body.name, image: req.body.image, description: req.body.description, cost: req.body.cost, location: location, lat: lat, lng: lng};
       
    Campground.findByIdAndUpdate(req.params.id,{$set :newData},function(err,updatedCampground)
    {
        if(err){
    
        res.redirect("/campgrounds");
        }
        else{
            res.redirect("/campgrounds/"+req.params.id);
        }
    });
}});
//destroy
router.delete("/:id",middleware.checkCampgroundOwnership, function(req,res){
   
    Campground.findByIdAndRemove(req.params.id,function(err)
    {
        if(err)
        {
            res.redirect("/campgrounds");
        }
        else{
            res.redirect("/campgrounds");
        }
    });
});

});

module.exports = router;