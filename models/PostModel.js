const mongoose = require("mongoose");

const PostSchema=mongoose.Schema({
    title:String,
    body:String,
    device:String,
    userId:String
},{versionKey:false});

const PostModel=mongoose.model("post",PostSchema);

module.exports = PostModel;
