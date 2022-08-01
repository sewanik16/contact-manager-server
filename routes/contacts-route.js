const contactsModel = require("../models/contacts-model")
const userModel = require("../models/user-model")
const jwt = require("jsonwebtoken")
const express = require("express")

const router = express.Router()

router.get("/",(req,res)=>{
    try{
        const user = jwt.verify(req.headers.authorization,process.env.SECRET_KEY)
        userModel.find({username:username.username}).then((userData)=>{
            if(userData.length){
                contactsModel.find({username:user.username}).then((contacts)=>{
                    res.status(200).send(contacts)
                }).catch((err)=>{
                    res.status(400).send("Process Issue")
                })
            }else{
                res.status(400).send("UnAuthorized User")
            }
        }).catch(()=>{
            res.status(400).send("Network Issue")
        })
    }catch(err){
        res.status(400).send("Network Issue")
    }
})



router.post("/add",(req,res)=>{
    
    try{
        const user = jwt.verify(req.headers.authorization,process.env.SECRET_KEY)
        
        userModel.find({username:user.username}).then((userData)=>{
         console.log(req.body)
            if(userData.length){
                contactsModel.create({contact:req.body,username:user.username}).then(()=>{
                    res.status(200).send("Data Added")
                }).catch((err)=>{
                    res.status(400).send("Process Issue")
                })
            }else{
                res.status(400).send("UnAuthorized User")
            }
        }).catch((err)=>{
            res.status(400).send("user not found")
        })
    }catch(err){
        res.status(400).send("ERR: Network Issue")
    }
})

router.delete("/delete",(req,res)=>{
    try{
        const user = jwt.verify(req.headers.authorization,process.env.SECRET_KEY)

        userModel.find({username:user.username}).then((userData)=>{
            if(userData.length){
                contactsModel.deleteMany().then(()=>{
                    res.status(200).send("Data Deleted")
                })
            }else{
                res.status(400).send("UnAuthorized User")
            }
        })
    }catch(err){
        res.status(400).send("err:"+err)
    }
})


module.exports = router

// router.post("/add",(req,res)=>{
//     console.log(req.body)
//     contactsModel.create(req.body).then(()=>{
//         res.send("user contact saved...")
//     }).catch((err)=>{
//         res.send(err.message)
//     })
// })

// router.delete("/delete/:id",(req,res)=>{
//     console.log(req.params)
//     contactsModel.deleteOne({_id:req.params.id}).then(()=>{
//         res.send("contact deleted...")
//     }).catch((err)=>{
//         res.send(err.message)
//     })
// })

