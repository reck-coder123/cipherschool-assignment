const router = require("express").Router();
const { User } = require("../models/user");
const Token = require("../models/token");
const crypto = require("crypto");
const mailsend=require('../mailsend/mailsend')
const bcrypt=require('bcrypt');

router.post('/',async(req,res)=>{
    try {
       const{email,password} =req.body;
       let user=await User.findOne({email:email});
       if(!user){
        return res.status(400).json({ message: "User does not exist. " });
       }
       const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials. " });

    if (!(user.isVerfied)) {
        let token = await Token.findOne({ userId: user._id });
        if (!token) {
            token = await new Token({
                userId: user._id,
                token: crypto.randomBytes(32).toString("hex"),
            }).save();
            const url = `${process.env.BASE_URL}users/${user._id}/verify/${token.token}`;
            await mailsend(user.email, "Verify Email", url);
        }

        return res
            .status(400)
            .send({ message: "An Email sent to your account please verify" });
    }

    const token= await user.generateAuthToken();
    res.cookie("jwt",token,{
        expires:new Date(Date.now()+500000),
        httpOnly:true
    })
    res.status(200).send({ data: token, message: "logged in successfully" });
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
        console.log(error)
    }
})
module.exports=router