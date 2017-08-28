var mongoose    = require("mongoose");
var Campground  = require("./models/campgrounds");
var Comment     = require ("./models/comments");
var data  = [
    {name :"clouds rest ",img : "http://www.lrn.usace.army.mil/portals/49/siteimages/Locations/Lakes/Cheatham/Camping%20Page/Lock%20A%20Campground%20and%20Beach%20035.jpg",
    description :"Paragraphs are the building blocks of papers. Many students define paragraphs in terms of length: a paragraph is a group of at least five sentences, a paragraph is half a page long, etc. In reality, though, the unity and coherence of ideas among sentences is what constitutes a paragraph. A paragraph is defined as “a group of sentences or a single sentence that forms a unit” (Lunsford and Connors 116). Length and appearance do not determine whether a section in a paper is a paragraph. For instance, in some styles of writing, particularly journalistic styles, a paragraph can be just one sentence long. Ultimately, a paragraph is a sentence or group of sentences that support one main idea. In this handout, we will refer to this as the “controlling idea,” because it controls what happens in the rest of the paragraph."
        
    },
    {name :"canyon floor ",img : "https://www.nhstateparks.org/uploads/images/Dry-River_Campground_02.jpg",
    description :"Paragraphs are the building blocks of papers. Many students define paragraphs in terms of length: a paragraph is a group of at least five sentences, a paragraph is half a page long, etc. In reality, though, the unity and coherence of ideas among sentences is what constitutes a paragraph. A paragraph is defined as “a group of sentences or a single sentence that forms a unit” (Lunsford and Connors 116). Length and appearance do not determine whether a section in a paper is a paragraph. For instance, in some styles of writing, particularly journalistic styles, a paragraph can be just one sentence long. Ultimately, a paragraph is a sentence or group of sentences that support one main idea. In this handout, we will refer to this as the “controlling idea,” because it controls what happens in the rest of the paragraph."
        
    },
    {name :"dessert storm ",img : "https://campvermont.com/uploads/June%202006-Campground%20014.jpg",
    description :"Paragraphs are the building blocks of papers. Many students define paragraphs in terms of length: a paragraph is a group of at least five sentences, a paragraph is half a page long, etc. In reality, though, the unity and coherence of ideas among sentences is what constitutes a paragraph. A paragraph is defined as “a group of sentences or a single sentence that forms a unit” (Lunsford and Connors 116). Length and appearance do not determine whether a section in a paper is a paragraph. For instance, in some styles of writing, particularly journalistic styles, a paragraph can be just one sentence long. Ultimately, a paragraph is a sentence or group of sentences that support one main idea. In this handout, we will refer to this as the “controlling idea,” because it controls what happens in the rest of the paragraph."
        
    }
    
    ]
    
function  seedDB()
{
//remoove all campgeounds 
    Campground.remove({},function(err)
    {
        if (err){
        console.log(err);}
        else{
        console.log("removed campgrounds ");}
//add campgrounds        
    data.forEach(function(seed)
        {
        Campground.create(seed,function(err,campground)
            {
            if (err){
            console.log(err);}
            else{
            console.log("added a campground");}
            //creaerte commetn
            Comment.create(
                        
                        {text:"this place is great but wish had internet",
                            author :"homer"
                            },function(err,comment){
                                if(err)
                                {
                                console.log(err);
                                }
                                else
                                {
                                campground.comments.push(comment);
                                campground.save();
                                console.log("comment created");
                                }
                            });
            });
        });
    
            
        });


}

module.exports= seedDB;