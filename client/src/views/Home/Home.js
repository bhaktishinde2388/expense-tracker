import React from 'react'
import { useEffect } from 'react'

function Home() {


useEffect(() => {
const readCurrentUser = JSON.parse(localStorage.getItem('readCurrentUser'))

if(!readCurrentUser){
  window.location.href= '/login'
}
},[])

  return (
    <div>
      <h1>Welcome To Expense Tracker</h1>
    </div>
  )
}

export default Home