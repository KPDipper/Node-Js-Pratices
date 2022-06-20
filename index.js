const express = require('express')     //to create express API
//here require is done for importing

require('dotenv').config()// here to use envrionment



//to create app

const app = express()

const port = process.env.PORT  || 8000

const db=require('./Database/connection')//yo tai connection bata functon call garera databse sanga connect gareko
//abha server ma database sanga connect huncha

const morgan=require('morgan')
// const expressValidator=require('express-validator')
const bodyParser=require('body-parser')

//route call garna ko lagi

const categoryRoute = require('./Route/categoryRoute')//yo route define garna ko lagi

const subCategoryRoute=require('./Route/subCategoryRoute')

const productRoute= require('./Route/productRoute')

const userRoute= require('./Route/userRoute')


//middleware
app.use(bodyParser.json())
app.use('/public/uploads',express.static('public/uploads'))//here datbase lai access garnu paryo bhane file hari lai display garnu paryo bhane
//file read hunu paryo here database ma string matra bascha//so to read file we need this code


app.use(morgan('dev'))
// app.use(expressValidator())
app.use('/api',categoryRoute)
app.use('/api',subCategoryRoute)
app.use('/api',productRoute)
app.use('/api',userRoute)

//server start bhyo bhane tala yo messageaunu paryo
//port ma j ai racha teslai tai kam garne bhyo app.listen
app.listen(port,()=>{

    console.log(`Server is running at port ${port}`)
})
//yesle tai hamro server autostart garcha save garda kheri




//these both of the method are wrongfully done and don't do it
// app.get('/',(req,res)=>{
   
//     res.send("welcome to express again")
// })

// app.get('/api',showMsg)//hamile yesari call garne
// app.get('/api/homie',hiddenMsg)





