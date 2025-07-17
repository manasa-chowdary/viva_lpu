import express from 'express';
//import bycrpt from 'bycrpt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js'

const router=express.Router();
router.post('/register', async(req, res)=>{
    const {email, password } =req.body;
    const passwordHash = await bycrpt.hash(password, 10);
    const newUser=new User({email, passwordHash});
    await newUser.save();
    res.json({message:'User registered'});
});

router.post('/login', async(req, res)=> {
    const{email, password}=req.body;
    const user = await User.findOne({email});
    if(!user || !(await bycrpt.compare(password, user.passwordHash))){
        return req.statusCode(401).json({message:'Inavlid Credentials'});
    }
    const token = jwt.sign({userId:user._id}, process.env.Jwt_SECRET);
});
export default router;