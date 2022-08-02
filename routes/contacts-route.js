const contactsModel = require("../models/contacts-model")
const userModel = require("../models/user-model")
const jwt = require("jsonwebtoken")
const express = require("express")

const router = express.Router()

router.get("/",(req,res)=>{
    try{
        // console.log(req.headers.authorization)
        const user = jwt.verify(req.headers.authorization,process.env.SECRET_KEY)
        // console.log("test2")
        userModel.find({username:user.username}).then((userData)=>{
            if(userData.length){
                contactsModel.find({username:user.username}).then((contacts)=>{
                    res.status(200).send(contacts)
                }).catch((err)=>{
                    res.status(400).send("contacts not found")
                    console.log("contacts not found")
                })
            }else{
                res.status(400).send("UnAuthorized User")
                console.log("unauthorized user")
            }
        }).catch(()=>{
            res.status(400).send("Network Issue")
        })
    }catch(err){
        res.status(400).send("Network Issue")
        console.log("somethinf ")
    }
})



router.post("/add",(req,res)=>{
    
    try{
        const user = jwt.verify(req.headers.authorization,process.env.SECRET_KEY)
        
        userModel.find({username:user.username}).then((userData)=>{
        req.body.pop()
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
       
        const {username} = jwt.verify(req.headers.authorization,process.env.SECRET_KEY)
        
        userModel.find({username:username}).then((user)=>{
            // console.log(user)
            if(user.length){
                contactsModel.updateMany({username: username},{$pull:{contact:{_id:{$in:req.body}}}},{multi:true}).then(()=>{
                    
                    contactsModel.find({username: username}).then((data)=>{console.log(user)
                        // console.log(data[0].contact.length)
                        if(data[0].contact.length==0){
                            contactsModel.deleteOne({username: username}).then(()=>{
                                console.log("user deleted")
                            }).catch((err)=>{
                                console.log(err.message)
                            })
                           }
                    })
                    res.status(200).send("Data deleted")
                }).catch((err)=>{
                    res.status(400).json("Process Issue")
                })
            }else{
                res.status(400).json("UnAuthorized User")
            }
        }).catch((err)=>{
            res.status(400).json("Network Issue")
        })
    }catch(err){
        res.status(400).json("Network Issue")
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

