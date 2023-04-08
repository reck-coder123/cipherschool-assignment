const mongoose=require('mongoose');
const jwt=require('jsonwebtoken')
const schema=mongoose.Schema({
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    email: { type: String, required: true, unique: true, },
	password: { type: String, required: true },
    
    isVerfied:{type:Boolean,default:false},
    picturePath: {
        type: String,
        default: "",
      },
      mobile:{
        type:String,
      },
      tokens:[{
        token:{
        type:String,
        required:true
        }
    }],
})

schema.methods.generateAuthToken =async function () {
	try {
        const token =jwt.sign({_id:this._id.toString()},process.env.JWTSECRETKEY);
        this.tokens=this.tokens.concat({token:token});
        await this.save();
        return token;
    } catch (error) {
        
        console.log('the error part'+error);
    }
}; 
const User = mongoose.model("user", schema);

module.exports= {User};