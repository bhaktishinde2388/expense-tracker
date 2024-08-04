import React from 'react'
import "./TransactionCard.css"
function TransactionCard({ _id , title, amount, category, type,createdAt}) {
  return (
    
  <div className='transaction-card-container'>
    <span className='title'> {title}</span>
<span className='category'>{category}</span>
<span className='type'>{type}</span>
    <span className='amount'>{amount}</span>
    <soan className="createdAt">{createdAt}</soan>
    </div>
  )
}

export default TransactionCard