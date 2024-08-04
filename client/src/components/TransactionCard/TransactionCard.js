import React from 'react'
import "./TransactionCard.css"
function TransactionCard({ _id , title, amount, category, type,createdAt}) {
  return (
    
  <div className='transaction-card-container'>
    <span className='title'>{title}</span>
<span className='category' style={{backgroundColor: type === "credit" ? "green": "red" }}>{category}</span>


    <span className='amount'style={{color: type === "credit" ? "green": "red" }}>{type === "credit" ? "+ ": "-"}{amount}Rs</span>
    <span className="createdAt">{new Date(createdAt).toDateString()}</span>
    </div>
  )
}

export default TransactionCard