import  express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
dotenv.config();

import User from "./models/User.js";
import Transaction from "./models/Transaction.js"

const app = express();
app.use(express.json());
app.use(cors());



// mongodb connection

const connectDB = async ()=>{
    const connection = await mongoose.connect(process.env.MONGO_URL)

    if (connection){
        console.log("mongoodb is connected successfully😄")
    }
    
};
connectDB();

app.get('/',(req,res)=>{
    res.json({
        message:`welcome to Expense Tracker API`
    })
})

app.post('/login', async (req,res)=>{
  
    const { email, password } = req.body;

    const user = await User.findOne({
      email: email,
      password: password
    });
  
    if (user) {
      return res.json({
        success: true,
        message: "Login successful",
        data: user
      })
    }
    else {
      return res.json({
        success: false,
        message: "Invalid credentials",
        data: null
      })
    }
})

app.post("/signup",)

const PORT= process.env.PORT || 5000;

app.listen(PORT,() =>{
    console.log(`Server is running on port ${PORT}`)
})