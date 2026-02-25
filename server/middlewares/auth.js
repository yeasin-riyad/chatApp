import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect=async(req,res,next)=>{
    let token=req.headers.token;
    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        const userId=decoded.userId;
        const user=await User.findById(userId).select("-password");
        if(!user){
            return res.json({success:false,message:"Not Authorized, User Not Found"});
        }
      
        req.user=user;
        next();

    }catch(error){
        return res.status(401).json({success:false,message:error.message});

    }
}