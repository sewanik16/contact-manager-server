const express = require("express")
const mongoose = require("mongoose")
const contactsRoute = require("./routes/contacts-route")
const userRoute = require("./routes/user-route")
const cors = require("cors")
require("dotenv").config()

const app = express()
app.use(express.json())
app.use(cors())

app.listen(process.env.PORT || 5000,()=>{
    console.log("server running at port : 5000")
})
// const DB = "mongodb+srv://admin:admin1234@contactsmanager.p83t7et.mongodb.net/contactsManager?retryWrites=true&w=majority"
mongoose.connect("mongodb://localhost/contactsManager").then(()=>{
    console.log("connected to database.....")
}).catch((err)=>{
    console.log("database connecton failed!")
})


app.use("/contacts",contactsRoute)
app.use("/user",userRoute)




