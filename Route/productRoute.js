const express= require('express')
const { addproduct, showallproducts, singleproduct, updateproduct, deleteproduct } = require('../Controller/productController')
const upload =require('../Middleware/upload')

const router= express.Router()


router.post('/addproduct',upload.single('product_image'),addproduct)
router.get('/showallprod',showallproducts)
router.get('/showsingleproduct/:pid',singleproduct)
router.put('/updateproduct/:pid',updateproduct)
router.delete('/deleteproduct/:pid',deleteproduct)




module.exports=router