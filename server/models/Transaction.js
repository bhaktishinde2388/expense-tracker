import { Schema , model } from "mongoose";

const TransactionSchema = new Schema({
    amount:{
        typs:Number,
        required:true
    },
    category:{
        typs:String,
        required:true,
    },
   type:{
        typs:String,
        required:others,
    },
    user:{
        typs:Schema.Types.ObjectId,
        ref:"user",
        enum:["debit","credit"]
    }
}
{
    timestamps:true,
    }
);
const Transaction = model("Transaction",TransactionSchema);

export default Transaction;