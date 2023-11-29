const express = require('express')
const mongoose = require ('mongoose')
const cors = require('cors')

require('dotenv').config(); 
const routes = require("./Routes/TakeRoutes")
const app = express()
const PORT = process.env.PORT | 5000

app.use(express.json())
app.use(cors())

mongoose.connect(process.env.MONGO_URI)
.then(result => {
    console.log(result , 'conected to data base')
})

.catch(err => {
    console.log('not connected ' , err)
})

app.use("/api" ,routes);

app.listen(PORT,() =>{
    console.log("connected to server")
})