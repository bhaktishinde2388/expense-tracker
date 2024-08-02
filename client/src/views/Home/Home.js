import React, { useState } from 'react'
import { useEffect} from 'react'
import "./Home.css"
import toast, {Toaster} from 'react-hot-toast'

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

  const response = await axios.get(`${process.env.REACT_APP_API_URL}/transactions?userId=${user._id}`)

  setTransactions(response.data.data)

  return (
    <div>
      <h1 className='user-greeting'>Hello {user.name}</h1>
      <h3 className='heading'>Welcome To Expense Tracker</h3>

      <span className='logout'
      onClick={()=>{
        localStorage.clear()
        toast.success("logout successfully")
        setTimeout(()=>{
          window.location.href = '/'
        }, 2000)
      }}
      
      >Logout</span>

      <Toaster/>
    </div>
  )
}

export default Home