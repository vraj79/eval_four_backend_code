const express = require("express");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const UserModel = require("../models/UserModel");
const UserRouter=express.Router();

UserRouter.post("/register",async(req,res)=>{
    try {
        const {name,email,gender,password}=req.body;
        const hash=await bcrypt.hash(password,bcrypt.genSaltSync(10));
        const user=new UserModel({name,email,gender,password:hash});
        await user.save();
        res.status(200).send({success:true,user});
    } catch (error) {
        res.send({error:error.message});
    }
});

UserRouter.post("/login",async(req,res)=>{
    try {
        const {email,password}=req.body;
        const existedUser=await UserModel.findOne({email:email});
        if(existedUser){
            let result=await bcrypt.compare(password,existedUser.password);
            if(result){
                const token=jwt.sign({userId:existedUser._id},process.env.JWT_SECRET);
                res.send({msg:"Logged in successfully",token});
            }else{
                res.send("Enter correct email or password");
            }
        }else{
            res.send("User doesn't exist");
        }
    } catch (error) {
        res.send({error:error.message});
    }
})

module.exports=UserRouter;