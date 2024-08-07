import "./AddTransaction.css"
import React, { useState  , useEffect} from 'react'
import axios from "axios"

function AddTransaction() {

    const [user, setUser] = useState('')
    const [title, setTitle] = useState('')
    const [amount, setAmount] = useState(0)
    const [type, setType] = useState('credit')
    const [category ,setCategory] = useState("shopping")

    useEffect(() =>{
        const currentUser = JSON.parse(localStorage.getItem('currentUser'))
        if (currentUser) {
            setUser(currentUser)
          }
      
          if (!currentUser) {
            window.location.href = '/login'
          }
        }, [])


        const addTransaction = async () => {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/transaction`, {
              title,
              amount,
              type,
              category,
              user: user._id
            })

            setTitle('')
            setType("credit")
            setCategory("shopping")
            setAmount(0)
              

        // timeout
        setTimeout(() => {
            window.location.href = '/'
          }, 2000)
        }
      


  return (
    <div>
        <h1>AddTransaction</h1>
<form className="add-transaction-container">
    <input className="transaction-input b"
    type="text"
    placeholder="title"
    value={title}
    onChange={(e) => setTitle(e.target.value)}
    />

    <input className="transaction-input b"
    type="number"
    placeholder="amount"
    value={amount}
    onChange={(e) => setAmount(e.target.value)}
    />


     <select className="transaction-input" value={type}   onChange={(e) => setType(e.target.value)}>
            <option value="credit">Credit</option>
            <option value="debit">Debit</option>
     </select>



     <select className="transaction-input" value={category}   onChange={(e) => setCategory(e.target.value)}>
            <option value="Learning">Learning</option>
            <option value="shopping">shopping</option>
            <option value="food">food</option>
            <option value="salary">salary</option>
            <option value="health">health</option>
            <option value="traveling">traveling</option>
            <option value="accessories">accessories</option>
     </select>

     <button type="button" className="btn" onClick={addTransaction}>
          Add Transaction
        </button>

</form>

    </div>
  )
}

export default AddTransaction
