const express = require("express");
const PostModel = require("../models/PostModel");
const PostRouter=express.Router();

PostRouter.get("/",async(req,res,next)=>{
    try {
        const userId=req.body.userId;
        const posts=await PostModel.find({userId:userId,device:req.query.device});
        res.send(posts);
    } catch (error) {
        res.send({error:error.message})
    }
})

PostRouter.post("/add",async(req,res)=>{
    try {
        const post =new PostModel(req.body);
        await post.save();
        res.send(post)
    } catch (error) {
        res.send({error:error.message})
    }
})

PostRouter.patch('/update/:id',async(req,res)=>{
    try {
        const userId=req.body.userId;
        const id=req.params.id;
        const post=await PostModel.findById(id);
        if(post.userId===userId){
            await PostModel.findByIdAndUpdate(id,req.body);
            res.send("post updated")
        }else{
            res.send("You are not authorized");
        }
    } catch (error) {
        res.send({error:error.message})
    }
})

PostRouter.delete('/delete/:id',async(req,res)=>{
    try {
        const userId=req.body.userId;
        const id=req.params.id;
        const post=await PostModel.findById(id);
        if(post.userId===userId){
            await PostModel.findByIdAndDelete(id);
            res.send("post deleted")
        }else{
            res.send("You are not authorized");
        }
    } catch (error) {
        res.send({error:error.message})
    }
})

module.exports=PostRouter;
