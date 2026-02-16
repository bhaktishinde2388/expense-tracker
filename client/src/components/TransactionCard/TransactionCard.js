import React from 'react'
import "./TransactionCard.css"
import Delete from "./image.png"
import axios from "axios"
import toast, {Toaster} from 'react-hot-toast'

function TransactionCard({ _id , title, amount, category, type,createdAt,loadTransactions}) {
  const deleteTransaction = async () => {
     try {
    const token = localStorage.getItem("token"); // get JWT

    const response = await axios.delete(`${process.env.REACT_APP_API_URL}/transaction/${_id}`,
      { headers: { Authorization: `Bearer ${token}` } } // send token
    )

    toast.success(response.data.message)

    loadTransactions();
  }catch (error) {
    console.error(error);
    toast.error(error.response?.data?.message || "Failed to delete transaction");
  }
};


  return (
    
  <div className='transaction-card-container'>
    <img className='delete-img' src={Delete} onClick={deleteTransaction}/>
    <span className='title'>{title}</span>
<span className='category' style={{backgroundColor: type === "credit" ? "green": "red" }}>{category}</span>


    <span className='amount'style={{color: type === "credit" ? "green": "red" }}>{type === "credit" ? "+ ": "-"}{amount}Rs</span>
    <span className="createdAt">{new Date(createdAt).toDateString()}</span>



    </div>
  )
}

export default TransactionCard