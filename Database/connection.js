const mongoose=require('mongoose')

mongoose.connect(process.env.DATABASE1,{ //yo tai database sanga connect garna ko lagi ho

    useNewUrlParser:true,
    useUnifiedTopology:true,
})

.then(()=>console.log('Database Connected'))
.catch((err)=>console.log(err))
