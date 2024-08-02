import React, { useState } from 'react'
import { useEffect,useState} from 'react'

function Home() {
const [user,setUser]=useState('')

useEffect(() => {
const currentUser = JSON.parse(localStorage.getItem('currentUser'))
if(currentUser){
  setUser(currentUser)
}


if(!currentUser){
  window.location.href='/login'
}
},[])

  return (
    <div>
      <h1>Welcome To Expense Tracker</h1>
    </div>
  )
}

export default Home