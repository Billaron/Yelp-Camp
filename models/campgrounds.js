var mongoose    = require("mongoose");


//mongoose.connect("mongodb://localhost/yelp_camp");

var campgroundSchema = new mongoose.Schema({
    name        : String,
    price       : String,
    img         : String,
    location: String,
   lat: Number,
   lng: Number,
    createdAt: { type: Date, default: Date.now },
    description : String,
    author      : {id :{
                        type :mongoose.Schema.Types.ObjectId,
                        ref: "User"
                        },username:String},
    comments    :   [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref : "Comment"
        }
        ]
        
        
});
module.exports = mongoose.model("Campground",campgroundSchema);
