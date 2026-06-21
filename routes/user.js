const express = require("express");
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const User = require("../Models/user.js");
const passport = require("passport");
const {saveRedirectUrl} = require("../utils/middleware.js");


//Signup
router.get("/signup",(req,res)=>{
        res.render("./users/signup.ejs");
});

router.post("/signup", 
    wrapAsync(async(req,res,next)=>{
        try {
            const {name, email, username, password} = req.body.user;
            const newUser = new User({name, email, username});
            const userRegistration = await User.register(newUser, password);
            req.login(userRegistration,(err)=>{
                if(err){
                    return next(err);
                }
                req.flash("success", "Welcome to Wanderlust!");
                res.redirect("/listings");
            });
        } catch(e) {
            req.flash("error", e.message);
            res.redirect("/user/signup");
        }
    })
);

//Login
router.get("/login",(req,res)=>{
    res.render("users/login.ejs");
});
router.post("/login",saveRedirectUrl,
    passport.authenticate(
    "local", {
        failureFlash: true,
        failureRedirect: "/user/login",
    }),
    wrapAsync(async(req,res)=>{
        req.flash("success", "Welcome back to Wanderlust!");
        const redirect = res.locals.redirectUrl || "/listings";
        res.redirect(redirect);
    })
);

//Logout
router.get("/logout",(req,res,next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","You are successfully Logged-Out.");
        res.redirect("/listings");
    });
})

module.exports = router;