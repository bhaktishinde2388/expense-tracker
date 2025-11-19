import { Schema, model } from "mongoose";
import jwt from "jsonwebtoken";

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
}, {
  timestamps: true,
});


//json web token

//instance method  .....with the helpof this  we can create multiple methods
userSchema.methods.generateToken = async  function(){
try{
 return jwt.sign({
  //payload
  userId:this._id.toString(),
  email:this.email,
  isAdmin:this.isAdmin,
 },
process.env.JWT_SECRATE_KEY,
{
  expiresIn:"1d",
}
)
}catch(error){
console.error(error);
}
}




const User = model("User", userSchema);

export default User;