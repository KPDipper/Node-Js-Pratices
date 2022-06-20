
Product = require("../Model/productModel")


exports.addproduct=async(req,res)=>{

    let addprod= new Product({

        product_title:req.body.product_title,
        product_price:req.body.product_price,
        product_image:req.file.path,
        product_description:req.body.product_description,
        count_in_stock:req.body.count_in_stock,
        review:req.body.review,
        sub_category:req.body.sub_category,
        rating:req.body.rating,
    })
    addprod= await addprod.save()
    if(!addprod){

        res.satus(400).json({error:"Something wnet wrong"})
    }
    else{
        res.send(addprod)
    }    
}


//to show all products:

exports.showallproducts= async(req,res)=>{

    let showallprod = await Product.find().populate( { path: "sub_category", populate: "category" })
    if(!showallprod){
        return res.status(400).json({error:"something went wrong"})
    }
    else{
        res.send(showallprod)
    }
}


//to find single product//for product details

exports.singleproduct= async(req,res)=>{

    let singleprod = await Product.findById(req.params.pid)
    if(!singleprod){

        return res.status(400).json({error:"Something went wrong"})
    }
    else{
         res.send(singleprod)
    }
}

//to update a singleproduct:

exports.updateproduct=async(req,res)=>{

    let updateprod= await Product.findByIdAndUpdate(req.params.pid,{

        product_title:req.body.product_title,
        product_price:req.body.product_price,
        product_image:req.file.path,
        product_description:req.body.product_description,
        count_in_stock:req.body.count_in_stock,
        review:req.body.review,
        sub_category:req.body.sub_category,
        rating:req.body.rating,

    },{
     new:true
    })

    if(!updateprod){
        return res.status(400).json({error:"Something went wrong."})

    }
    else{
        res.send(updateprod)
    }
}

exports.deleteproduct= (req,res)=>{

    let deleteprod =  Product.findByIdAndDelete(req.params.pid)
    .then(deleteprod=>{
        if(!deleteprod){
            return res.status(400).json({error:"Product not found"})
        }
        else{
            return res.status(200).json({msg:"Product Successfully deleted"})
        }
    })
    .catch(err=>res.status(400).json({error:"Something went wrong"}))
}