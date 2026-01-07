const express=require("expresss")
const IsLoggedIn=require("../middlewares/isloggedin")

const router=express.Router();

router.get("/",(req,res)=>{
    res.send("page home")
})


router.get("/shop",IsLoggedIn,(req,res)=>{
    res.render("shop")
})

router.get("/")

