const express=require('express')
const { addsubcategory, showallsubcategories, findsinglesubcategory, updatesinglesubcategory, deletesubcategory } = require('../Controller/subCategoryController')

const router=express.Router()


router.post('/addsubcat',addsubcategory)
router.get('/showallsubcats',showallsubcategories)
router.get('/findsinglesubcat/:scid',findsinglesubcategory)
router.put('/updatesubcategory/:scid',updatesinglesubcategory)
router.delete('/deletesubcategory/:scid',deletesubcategory)




module.exports=router