const cookie=require("cookie-parser")
const jwt=require("jsonwebtoken");
const userModel = require("../models/User");

module.exports.IsLoggedIn=async function IsLoggedIn(){

if(!req.cookie.token){
    res.flash("error","you have to loggin first");
    res.redirect("/")
}else{ 

    try{
       const decoded= jwt.verify(req.cookie.token,process.env.JWT_TOKEN)
       const user=await userModel.find({email:decoded.email}).select("-password");
          req.user=user;
       next()       

    }catch(err){
        req.flash("Error","something went wrong");
        res.redirect('/')
    }
 
}

}