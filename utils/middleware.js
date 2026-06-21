const listing = require("../Models/listing.js");
const Review = require("../Models/review.js");
//Authorization
module.exports.isLoggedIn = (req,res,next)=>{
    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl;
        return res.redirect("/user/login");
    }
    next();
};

module.exports.saveRedirectUrl = (req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    
    next();
};

module.exports.isOwner = async(req,res,next)=>{
    const {id} = req.params;
    let list = await listing.findById(id);
    if(!list){
        req.flash("error","Listing not found!");
        return res.redirect("/listings");
    }
    if(res.locals.currUser && !list.owner.equals(res.locals.currUser._id)){
        req.flash("error","UnAuthorized Access");
        return res.redirect(`/listings/${id}`);
    }
    next();
};

module.exports.isAuthor = async(req,res,next)=>{
    const {id,reviewId} = req.params;
    let review = await Review.findById(reviewId);
    if(!review){
        req.flash("error","Review not found!");
        return res.redirect(`/listings/${id}`);
    }
    if(res.locals.currUser && !review.author.equals(res.locals.currUser._id)){
        req.flash("error","UnAuthorized Access");
        return res.redirect(`/listings/${id}`);
    }
    next();
}
