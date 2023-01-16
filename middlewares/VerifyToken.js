const jwt = require('jsonwebtoken')

exports.VerifyToken=(req,res,next)=>{
    const token=req.headers.token;
    if(!token) return res.send("You are not logged in");

    const decoded=jwt.verify(token,process.env.JWT_SECRET);
    if(decoded){
        const userId=decoded.userId;
        req.body.userId=userId;
        next()
    }else{
        res.send("You are not logged in")
    }
}