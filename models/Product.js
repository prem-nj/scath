const mongoose=require("mongoose");

const productSchema=mongoose.Schema({
    productName:String,
    price:Number,
    image:String,
     
     discount:{
        type:Number,
        default:0
     },

     bgcolor:String,
     pancolor:String,
     textcolor:String
})

const productModle=mongoose.model("product",productSchema);

module.exports=productModle;
