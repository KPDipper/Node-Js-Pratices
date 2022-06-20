const express =require('express')
const { addUser, userSignin } = require('../Controller/userController')

const router=express.Router()

router.post('/adduser',addUser)
router.post('/signin',userSignin)

module.exports=router