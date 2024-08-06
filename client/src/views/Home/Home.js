import React, { useState } from 'react'
import { useEffect} from 'react'
import "./Home.css"
import toast, {Toaster} from 'react-hot-toast'
import axios from "axios"
import {Link} from "react-router-dom"
import TransactionCard from '../../components/TransactionCard/TransactionCard.js'

function Home() {
const [user,setUser]=useState('')
const [transactions, setTransactions] = useState([])
const [netIncome, setNetIncome] = useState(0)
const [netExpense, setNetExpense] = useState(0)

useEffect(() => {
const currentUser = JSON.parse(localStorage.getItem('currentUser'))
if(currentUser){
  setUser(currentUser)
}


if(!currentUser){
  window.location.href='/login'
}
},[])



const loadTransactions = async () => {
  if(!user._id){
    return
  }
  toast.loading('Loading transactions...')

  const response = await axios.get(`${process.env.REACT_APP_API_URL}/transactions?userId=${user._id}`)


  const allTransactions = response.data.data


  toast.dismiss()

  setTransactions(allTransactions)
}


  useEffect(() => {
    loadTransactions()
  }, [user])


  // net balance..............
  useEffect(()=>{
    let income = 0
    let expense=0
    transactions.forEach((transaction) => {
      if (transaction.type === 'credit')
         {income += transaction.amount }
      else{
        expense += transaction.amount
      }
    })
    setNetIncome(income)
    setNetExpense(expense)
  }, [transactions])

// ..............
  return (
    <div>
      <h1 className='user-greeting'>Hello.... <span className='user-greeting-name'>{user.name}😊</span></h1>
      <h3 className='heading'>Welcome To Expense Tracker</h3>

      <span className='logout'
      onClick={()=>{
        localStorage.clear()
        toast.success("logout successfully")
        setTimeout(()=>{
          window.location.href = '/login'
        }, 2000)
      }}
      
      >Logout</span>

{/* net balance......... */}
<div className='net-transactions-container'>
  <div className='net-transactions-value-item'>
       <span className='net-transaction-value-amount'>+ {netIncome}</span>
       <p className='net-transaction-value-title' >Net Income</p>
  </div>

  <div className='net-transactions-value-item'>
       <span className='net-transaction-value-amount'>- {netExpense}</span>
       <p className='net-transaction-value-title' >Net Expense</p>
  </div>

  <div className='net-transactions-value-item'>
       <span className='net-transaction-value-amount'>+ {netIncome - netExpense}</span>
       <p className='net-transaction-value-title' >Net Balance</p>
  </div>

{/* ......... */}
</div>


    {
      transactions.map((transaction) => {
            const {_id, title, amount, category, type, createdAt} = transaction

            
            return (<TransactionCard
              key={_id}
              _id={_id}
              title={title}
              amount={amount}
              category={category}
              type={type}
              createdAt={createdAt}
              loadTransactions={loadTransactions}
            />)
          })
        }
      <Toaster/>
    </div>
  )
}

export default Home