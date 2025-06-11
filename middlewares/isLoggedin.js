import jwt from 'jsonwebtoken';
import userModel from "../models/userModel.js";

const isLoggedin = async (req,res,next)=>{
    console.log(req.cookies.token)
    if(!req.cookies.token || req.cookies.token===""){
        return res.redirect("/login");
    }

    try{
        let decoded = jwt.verify(req.cookies.token, "secret");
        let user = await userModel.findOne({email:decoded.email}).select("-password");
        req.user = user;
        next();
    }catch{
        console.log("error","something went wrong");
        res.redirect("/login");
    }
}
export default isLoggedin;
 