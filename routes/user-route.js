const userModel = require("../models/user-model")
const express = require("express")

const router = express.Router()

router.post("/signup",(req,res)=>{
    userModel.create(req.body).then(()=>{
        res.send("user created successfully...")
    }).catch((err)=>{
        res.send(err.message)
    })
})

router.post("/signup",(req,res)=>{
    userModel.create(req.body).then(()=>{
        res.send("user created successfully...")
    }).catch((err)=>{
        res.send(err.message)
    })
})


module.exports = router

