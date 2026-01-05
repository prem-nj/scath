const mongoose=require("mongoose");


const ownerSchema=mongoose.Schema({
    fullname:String,
    email:String,
    password:String,
    picture:String,
    products:{
        type:Array,
        default:[]
    },
    gstin:String
})

const ownerModel=mongoose.model("owner",ownerSchema);

module.exports=ownerModel;

