const contactsModel = require("../models/contacts-model")
const express = require("express")

const router = express.Router()

router.post("/add",(req,res)=>{
    console.log(req.body)
    contactsModel.create(req.body).then(()=>{
        res.send("user contact saved...")
    }).catch((err)=>{
        res.send(err.message)
    })
})

router.delete("/delete/:id",(req,res)=>{
    console.log(req.params)
    contactsModel.deleteOne({_id:req.params.id}).then(()=>{
        res.send("contact deleted...")
    }).catch((err)=>{
        res.send(err.message)
    })
})

module.exports = router