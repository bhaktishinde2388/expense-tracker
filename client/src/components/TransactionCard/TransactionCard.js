import React from 'react'
import "./TransactionCard.css"
import Delete from "./image.png"
import axios from "axios"
import toast, {Toaster} from 'react-hot-toast'

function TransactionCard({ _id , title, amount, category, type,createdAt,loadTransactions}) {
  const deleteTransaction = async () => {
    const response = await axios.delete(`${process.env.REACT_APP_API_URL}/transaction/${_id}`)

    toast.success(response.data.message)

    loadTransactions()
  }
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