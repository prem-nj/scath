const express=require("express")
const uerRouter=express.Router();

uerRouter.get('/',(req,res)=>{
    res.send("userRouter working fine")
})


module.exports=uerRouter;