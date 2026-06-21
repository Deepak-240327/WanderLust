const util = require('util');
util.isArray = Array.isArray;

if(process.env.NODE_ENV !== "production"){
    require('dotenv').config()
}


const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const app = express();
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const listingRoute = require("./routes/listing.js");
const reviewRoute = require("./routes/review.js");
const userRoute = require("./routes/user.js");
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const passport = require("passport");
const localStrategy = require("passport-local");
const user = require("./Models/user.js");



app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));
app.use(express.static(path.join(__dirname,"public")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(methodOverride("_method"));
app.engine("ejs",ejsMate);

const dburl = process.env.ATLAS_URL;
;

main().then(()=>{
    console.log("Connected to DB.");
})
.catch((err)=>{
    console.log("error: "+err);
});

async function main() {
    await mongoose.connect(dburl);
}

const MongoStore = require('connect-mongo').MongoStore || require('connect-mongo');


store.on("error", (err) => {
    console.log("ERROR in MONGO SESSION STORE", err);
});

const store = MongoStore.create({
    mongoUrl: dburl,
    crypto: {
        secret: process.env.SECRET
    },
    touchAfter: 24 * 3600,
});



//session and flash messages
const sessionOptions = {
    store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie:{
        expires: Date.now()+ 7*24*60*60*1000,
        maxAge: 7*24*60*60*1000,
        httpOnly: true,
    },
};

app.use(session(sessionOptions));
app.use(flash());

//authentication middelwares
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(user.authenticate()));
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());



app.use((req,res,next)=>{
    res.locals.newListing = req.flash ? req.flash("newListing") : [];
    res.locals.listingUpdated = req.flash ? req.flash("listingUpdated") : [];
    res.locals.listingDeleted = req.flash ? req.flash("listingDeleted") : [];
    res.locals.error = req.flash ? req.flash("error") : [];
    res.locals.success = req.flash ? req.flash("success") : [];
    res.locals.currUser = req.user || null;
    next();
});



app.use("/listings", listingRoute);
app.use("/listings/:id/reviews", reviewRoute);
app.use("/user",userRoute);


app.get("/", (req,res)=>{
    res.redirect("/listings");
});

// Remaining route
app.all("*splat",(req,res,next)=>{
    next(new ExpressError(404,"Page not Found!"));
});


//Error handling
app.use((err,req,res,next)=>{
    let {status=500,message="Some error occured!"} = err;
    if (typeof res.locals.currUser === 'undefined') {
        res.locals.currUser = null;
    }
    res.status(status).render("listings/error.ejs",{message});
});

const port = 8080;
app.listen(port, () =>{
    console.log("Server is listening.");
});

