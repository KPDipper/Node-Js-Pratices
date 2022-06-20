const mongoose = require('mongoose')
const {ObjectId}= mongoose.Schema

const d_t = new Date();
 
let year = d_t.getFullYear();
let month = d_t.getMonth();
let day = d_t.getDate();


const productSchema=new mongoose.Schema({

    
    product_title:{
        type:String,
        required:true,
        trim:true
    },
    product_price:{
        type:Number,
        required:true,
        trim:true
    },
    product_description:{
        type:String,
        required:true,
        trim:true
    },
    count_in_stock:{
        type:Number,
        required:true
    },
    product_image:{
        type:String,
        required:true
    },
   
    review:{
      type:String,
      trim:true,
    },

    sub_category:{
        type:ObjectId,
        required:true,  
        ref:"SubCategory"
    },
    
    rating:{
        type:Number,
        default:5,
        max:10,

    }
    


},{timestamps:true})

module.exports=mongoose.model('Product',productSchema)