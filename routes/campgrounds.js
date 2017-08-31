var express = require("express")
var router = express.Router({mergeParams : true});
var Campground = require("../models/campgrounds");
var Comment = require("../models/comments");
var User = require("../models/user");
var middleware = require("../middleware/index")
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

var newcamp= {name :name ,img:img, description:description , author :author, price:price};
 
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
    Campground.findByIdAndUpdate(req.params.id,req.body.campground,function(err,updatedCampground)
    {
        if(err){
    
        res.redirect("/campgrounds");
        }
        else{
            res.redirect("/campgrounds/"+req.params.id);
        }
    });
});
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



module.exports = router;