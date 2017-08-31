var express = require("express");
var router = express.Router({mergeParams : true});
var Campground = require("../models/campgrounds");
var Comment = require("../models/comments");
var User = require("../models/user");


var middlewareObj = {};
    
middlewareObj.checkCampgroundOwnership = function( req,res,next)
{
    if(req.isAuthenticated())
    {
         Campground.findById(req.params.id,function(err,campground)
         {
            if(err)
            {
                req.flash("error","campground not found")
                res.redirect("back");
            }
            
            else
           {
               if(campground.author.id.equals(req.user.id))
                    {
                    return next();
                    }
                else
                    {
                    req.flash("error","you do not own this post")
                    res.redirect("back");
                    }
                }   
        });
    }
    else    {
            req.flash("error","please log in to add campgrounds")
            res.redirect("/login");
            }
};



middlewareObj.checkCommentOwnership = function (req,res,next)
{
    
    if(req.isAuthenticated())
    {
         Comment.findById(req.params.comment_id,function(err,ownComment)
         {
            if(err)
            {
                res.redirect("back");
                req.flash("error","comment not found")
            }
            
            else
                {
        
                   if(ownComment.author.id.equals(req.user.id))
                    {
                    return next();
                        
                    }
                    else
                    {
                        req.flash("error","you cannot edit others comments");
                        return res.redirect("back");
                    }
                }   
        });
    }
    
    else{
        req.flash("error","please log in to comment")
        res.redirect("back");
    }
};



middlewareObj.isLoggedIn = function isLoggedIn(req,res,next)
{
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error","you need to be logged in");
    res.redirect("/login");
};



module.exports = middlewareObj;