const express = require("express");
const router = express.Router({mergeParams: true});
const review = require("../Models/review.js");
const listing = require("../Models/listing.js")
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const {listingSchema, reviewSchema} = require("../schema.js");
const {isLoggedIn, isAuthor} = require("../utils/middleware.js");


const validateReviewSchema = (req,res,next) =>{
    let {error} = reviewSchema.validate(req.body);
    if(error){
        throw new ExpressError(404, error);
    }
    else{
        next();
    }
};

//post review route
router.post("/",isLoggedIn,validateReviewSchema,
    wrapAsync(async(req,res)=>{
        const list = await listing.findById(req.params.id);
        const newReview = new review(req.body.review);
        newReview.author = req.user._id;
        list.review.push(newReview);

        await newReview.save();
        await list.save();
        req.flash("success", "New Review Created!");
        res.redirect(`/listings/${list._id}`);
    })
);

//delete review route
router.delete("/:reviewId",isLoggedIn,isAuthor,
    wrapAsync(async(req,res)=>{
        const {id, reviewId} = req.params;
        await review.findByIdAndDelete(reviewId);
        await listing.findByIdAndUpdate(id , {$pull:{review: reviewId}});
        req.flash("success", "Review Deleted!");
        res.redirect(`/listings/${id}`);
    })
);

module.exports = router;