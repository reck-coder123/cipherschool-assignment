const express=require('express');
const router=express.Router();
const bcrypt=require('bcrypt');
const {User}= require('../models/user');
const Token = require("../models/token");
const crypto = require("crypto");
const mailsend=require('../mailsend/mailsend.js');

router.post('/',async(req,res)=>{
    try {
        const {
            firstname,
            lastname,
            email,
            password,
            mobile,
          } = req.body;
          let user=await User.findOne({email:email});
          if(user){
            return res.status(409).send({message:"User exists already!!"});
          }
        const salt = await bcrypt.genSalt(Number(process.env.SALT));
		const hashPassword = await bcrypt.hash(password, salt);

        const newuser= new User({
            firstname,
            lastname,
            email,
            password: hashPassword,
            mobile,
        })
        const tokenA= await newuser.generateAuthToken();
            res.cookie("jwt",tokenA,{
                expires:new Date(Date.now()+500000),
                httpOnly:true
            })
        const savedUser = await newuser.save();
        res.status(201).json(savedUser);
        const token = await new Token({
            userId: newuser._id,
            token: crypto.randomBytes(32).toString("hex"),
        }).save();
        const url = `${process.env.BASE_URL}users/${newuser.id}/verify/${token.token}`;
        await mailsend(newuser.email, "Verify Email", url);
        res
        .status(201)
        .send({ message: "An Email sent to your account please verify" });
    } catch (error) {
       res.status(500).send('Internal Server Error') ;
       console.log(error);
    }
})

router.get("/:id/verify/:token/", async (req, res) => {
	try {
		const user = await User.findOne({ _id: req.params.id });
		if (!user) return res.status(400).send({ message: "Invalid link" });

		const token = await Token.findOne({
			userId: user._id,
			token: req.params.token,
		});
		if (!token) return res.status(400).send({ message: "Invalid link" });

		await User.updateOne({_id: user._id},{
            $set:{
                isVerfied:true  
            }
        });
		await token.remove();
		res.status(200).send({ message: "Email verified successfully" });
        
	} catch (error) {
        console.log(error); 
        res.status(500).send({ message: "Internal Server Error" });
        
	}
});

module.exports = router;