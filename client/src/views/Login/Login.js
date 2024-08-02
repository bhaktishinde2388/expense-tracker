import React from 'react'
import "./Login.css"

function Login() {
  return (
    <div>
      <h1  className='login-heading'>Login</h1>

      <form className='form-container'>
      <input
          type='email'
          placeholder='Email'
          className='input-box'
          />

<input
          type='text'
          placeholder='Password'
          className='input-box'
          />

<button type='button' 
            className='register-btn'
           
            >Login</button>
      </form>
    </div>
  )
}

export default Login