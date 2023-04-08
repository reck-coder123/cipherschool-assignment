const express=require('express');
const {User}=require("../models/user");
const router=express.Router();

const getuser= async(req,res)=>{
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        res.status(200).json(user);
      } catch (err) {
        res.status(404).json({ message: err.message });
      }
};
router.get('/:id',getuser);
module.exports=router;