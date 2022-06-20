const mongoose = require('mongoose')
const {ObjectId}=mongoose.Schema

const subCategorySchema= new mongoose.Schema({


    subcategory_title:{
      type:String,
      required:true,
      trim:true
   
    },
    category:{
        type:ObjectId,
        required:true,
        ref:"Category"
    }

     
},{timestamps:true})


module.exports=mongoose.model('SubCategory',subCategorySchema)