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
userSchema.methods.generateToken = function(){
try{
 return jwt.sign({
  //payload
  userId:this._id.toString(),
  email:this.email,
  isAdmin:this.isAdmin || false,
 },
process.env.JWT_SECRATE_KEY,
{
  expiresIn:"1d",
}
)
}catch (error) {
    console.error("JWT generation failed:", error);
    return null;
}
}




const User = model("User", userSchema);

export default User;