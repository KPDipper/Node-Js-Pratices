const express = require('express')
const { addsingleCategory, showAllCategories, findsinglecategory, updateCategory, deleteCategory } = require('../Controller/categoryController')

const router= express.Router()



router.post('/addcat',addsingleCategory)
router.get('/showallcats',showAllCategories)
router.get('/findcategory/:cid',findsinglecategory)
router.put('/updatecategory/:cid',updateCategory)
router.delete('/deletecategory/:cid',deleteCategory)


module.exports=router