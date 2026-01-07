const bcrypt = require("bcrypt");
const userModel = require("../models/User");
const generateToken = require("../utils/generateToken");
const cookie=require("cookie-parser")

module.exports.registerUser = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(req.body.password, salt, async function (err, hash) {
        const user = await userModel.findOne({ email });
        if (user) {
          return res.send("you have account already");
        }

        const createduser = await userModel.create({
          fullname,
          email,
          password: hash,
        });

        const token = generateToken(createduser);
        res.cookie("token", token);

        res.status(201).json({
          message: "User registered successfully",
          user: {
            id: createduser._id,
            fullname: createduser.fullname,
            email: createduser.email,
          },
        });
      });
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports.loginUser=async (req,res)=>{
  try{
    const {email,password}=req.body;
    const user=userModel.find({email});

    if(user){
      bcrypt.compare(user.password,req.body.password,function(err,result){
        if(result===true){
           const token=generateToken(user);
           res.cookie("token",token);
        }else{
          res.status(500).send("something went wrong");
        }
      })
    }


  }catch(err){
       res.send(err);
  }
}