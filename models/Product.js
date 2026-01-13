const mongoose=require("mongoose");

const productSchema=mongoose.Schema({
    productName:String,
    price:Number,
    image:String,
     
     discount:{
        type:Number,
        default:0
     },

     color:String,
     strikeAmount:{
      type:Number,
      default:0
     },
     textcolor:String
})

const productModle=mongoose.model("product",productSchema);

module.exports=productModle;
