const mongoose = require("mongoose");
const review = require("./review.js");
const user = require("./user.js");

const ListingSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    image: {
        filename: String,
        url: String,
    },
    price: Number,
    location: String,
    country: String,
    review:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Review",
        }
    ],
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
});

ListingSchema.post("findOneAndDelete", async(listing)=>{
    if(listing){
        await review.deleteMany({_id: {$in: listing.review}});
    }
})

const Listing = mongoose.model("Listing",ListingSchema);

module.exports = Listing;