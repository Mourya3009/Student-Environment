import express from 'express'
const router = express.Router();
import userModel from "../models/userModel.js";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import isLoggedin from '../middlewares/isLoggedin.js';

router.get("/",(req,res)=>{
    if(req.cookies.token!=="" && req.cookies.token){
        return res.redirect('/profile');
    }
    res.render('home.ejs');
})
router.get('/login',(req,res)=>{
    if(req.cookies.token!=="" && req.cookies.token){
        return res.redirect('/profile');
    }
    res.render("login.ejs");
})
router.post('/register',async (req,res)=>{
    let {firstname,lastname,email,password,studentID} = req.body;
    let user = await userModel.findOne({email});
    if(user){
        return res.send("User already exists");
    }
    bcrypt.genSalt(10,(err,salt)=>{
        bcrypt.hash(password,salt,async (err,hash)=>{
            let user = await userModel.create({
            firstname,
            lastname,
            username: firstname+" "+lastname,
            email,
            password: hash,
            studentID
        });
            // res.send(createdUser);
            let token = jwt.sign({email:email,id:user._id},"secret");
            res.cookie("token",token,{maxAge:1000*60*60*24});
            console.log(req.cookies.token)
            res.redirect('/dashboard');
        })
    })  
})

router.post("/login",async (req,res)=>{
    let {email,password} = req.body;
    let user = await userModel.findOne({email});
    if(user){
    let hash = user.password;
    bcrypt.compare(password, hash, function(err, result) {
    if(result){
        let token = jwt.sign({email:email,id:user._id},"secret");
        res.cookie("token",token,{maxAge:1000*60*60*24});
        console.log(req.cookies.token)
        // 
        res.redirect('/dashboard');
    }
    else{
        res.send("Something went wrong");
    }

});
    }
    else{
        res.send("Something went wrong");
    }
})

router.get("/logout",isLoggedin,(req,res)=>{
    res.cookie("token","");
    console.log(req.cookies.token);
    res.redirect("/login")
})

router.get("/profile",isLoggedin,(req,res)=>{
    let data = req.user;
    console.log(data);
    // res.render("profile.ejs",{name:data.username});
    res.render("profile.ejs",{name:data.username});
})

router.get("/dashboard",isLoggedin,(req,res)=>{
    let data = req.user;
    console.log(data);
    // res.render("profile.ejs",{name:data.username});
    res.render("dashboard.ejs",{name:data.username});
})

export default router;