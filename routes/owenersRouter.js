const express=require("express")
const ownersRouter=express.Router();


ownersRouter.get('/',(req,res)=>{
    res.send("yes product working ")
})

module.exports=ownersRouter;