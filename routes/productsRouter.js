const express=require("express")
const productRouter=express.Router();


productRouter.get("/",(req,res)=>{
    res.send("product router is fine");
})


module.exports=productRouter;