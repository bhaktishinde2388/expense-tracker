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

 
  toast.dismiss()

  setTransactions(response.data.data)
}


  useEffect(() => {
    loadTransactions()
  }, [user])


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