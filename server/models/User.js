import { Schema , model } from "mongoose";

const userSchema = new Schema({
    name:{
        typs:String,
        required:true
    },
    email:{
        typs:String,
        required:true,
        uniq:true
    },
    password:{
        typs:String,
        required:true
    },
    dob:{
        typs:Date,
        required:true
    }
},
{
timestamps:true,
}
);

const User = model("User",userSchema);

export default User;