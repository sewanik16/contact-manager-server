const userModel = require("../models/user-model")
const express = require("express")
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")

const router = express.Router()

router.post("/signup",(req,res)=>{
    userModel.find({username:req.body.username}).then((user)=>{
        if(user.length){
            res.status(400).send("Username already Exist!")
        }else{
          let salt = 10;
          bcryptjs.genSalt(salt).then((saltvalue)=>{
              bcryptjs.hash(req.body.password,saltvalue).then((hashpassword)=>{
                  userModel.create({username:req.body.username,password:hashpassword}).then(()=>{
                    res.status(200).send("User Added")
                  }).catch(()=>{
                    res.status(400).send("user added failed!")
                  })
              }).catch(()=>{
                res.status(400).json("hash password generation failed!")
              })
          }).catch(()=>{
            res.status(400).json("salt generation failed!")
          })
        }
    })
})

router.post("/login",(req,res)=>{
    userModel.find({username:req.body.username}).then(async (user)=>{
        if(user.length){
           const value = await bcryptjs.compare(req.body.password,user[0].password)
           if(value){
            const jwtToken = jwt.sign({username:req.body.username},process.env.SECRET_KEY)
            res.status(200).send({authToken : jwtToken})
           }else{
            res.status(400).send("Invalid Password")
           }
        }else{
            res.status(400).send("User Not Exist")
        }
    }).catch((err)=>{
        res.status(400).send("err: "+ err.message)
    })
})

module.exports = router

// router.post("/signup",(req,res)=>{
//     userModel.create(req.body).then(()=>{
//         res.send("user created successfully...")
//     }).catch((err)=>{
//         res.send(err.message)
//     })
// })







