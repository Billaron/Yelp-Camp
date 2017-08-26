var mongoose    = require("mongoose");


mongoose.connect("mongodb://localhost/yelp_camp");

var campgroundSchema = new mongoose.Schema({
    name        : String,
    img         : String,
    description : String,
    comments    :   [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref : "Comment"
        }
        ]
});
module.exports = mongoose.model("Campground",campgroundSchema);
