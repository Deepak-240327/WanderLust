const express = require("express");
const router = express.Router({mergeParams: true});
const listing = require("../Models/listing.js");
const review = require("../Models/review.js");
const {listingSchema} = require("../schema.js");
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const {isLoggedIn} = require("../utils/middleware.js");
const {isOwner} = require("../utils/middleware.js");
const path = require('path');
const multer  = require('multer');
const {storage,cloudinary} = require("../cloudConfig.js");
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => cb(null, path.join(__dirname, '..', 'uploads')),
//     filename: (req, file, cb) => {
//         const ext = path.extname(file.originalname);
//         cb(null, Date.now() + '-' + Math.round(Math.random() * 1E9) + ext);
//     }
// });
const upload = multer({ storage });


const validateSchema = (req,res,next) =>{
    let {error} = listingSchema.validate(req.body);
    if(error){
        throw new ExpressError(404, error);
    }
    else{
        next();
    }
};


//Index Route
router.get("/",
    wrapAsync(async(req,res) =>{
    const allListing =  await listing.find({});
    res.render("listings/index.ejs",{allListing});
}));

//Create Route
router.get("/new", isLoggedIn,
    wrapAsync(async(req,res)=>{
    res.render("listings/new.ejs");
}));

router.post("/",isLoggedIn,upload.single('image'),
    validateSchema,
    wrapAsync(async(req,res)=>{
    let {title,description,price,location,country} = req.body;
    
    if(!req.file){
        throw new ExpressError(400,"Image file is required!");
    }
    
    const {path:url,filename} = req.file;
    let newList = new listing({
        title,
        description,
        price,
        location,
        country,
        image: {url,filename}
    });
    newList.owner = req.user._id;
    await newList.save()
    req.flash("newListing", "New Listing Created!")
    res.redirect("/listings");
}));


//Show Route
router.get("/:id",
    wrapAsync(async (req,res)=>{
    const {id} = req.params;
    const list = await listing.findById(id).populate({path: "review", populate:{path: "author"}}).populate("owner");
    if(!list){
        req.flash("error","Listing you requested for does not exist!");
        return res.redirect("/listings");
    }
    res.render("listings/show.ejs",{list});
}));

//update route
router.get("/:id/edit",isLoggedIn,isOwner,
    wrapAsync(async (req,res)=>{
    const {id} = req.params;
    const list = await listing.findById(id);
    if(!list){
        req.flash("error","Listing you requested for does not exist!");
        return res.redirect("/listings");
    }
    res.render("listings/edit.ejs",{list});
}));
router.put("/:id",isLoggedIn,isOwner,upload.single('image'),
    validateSchema,
    wrapAsync(async(req,res)=>{
    const {id} = req.params;
    const {title,description,price,location,country} = req.body;
    
    const updateData = {title,description,price,location,country};
    
    if(req.file){
        const {path:url,filename} = req.file;
        updateData.image = {url,filename};
    }
    
    await listing.findByIdAndUpdate(id,updateData,{new:true});
    req.flash("listingUpdated","Update Successful!");
    res.redirect(`/listings/${id}`);
}));

//delete route
router.delete("/:id",isLoggedIn,isOwner,
    wrapAsync(async(req,res)=>{
    const {id} = req.params;
    await listing.findByIdAndDelete(id);
    req.flash("listingDeleted","Delete Succesful!");
    res.redirect("/listings");
}));

module.exports = router;