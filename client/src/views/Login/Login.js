import React, { useState } from 'react'
import "./Login.css"
import toast, { Toaster } from 'react-hot-toast'
import axios from 'axios'
import { Link } from 'react-router-dom'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const login = async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/login`, {
        email,
        password
      })

      if (response.data.success) {
        toast.success(response.data.message)

        // Save user info and token in localStorage
        localStorage.setItem(
          'currentUser',
          JSON.stringify({ _id: response.data.userId, name: response.data.userName, email })
        )
        localStorage.setItem('token', response.data.token)

        toast.loading('Redirecting to dashboard...')

        // Redirect to Home page after 1 second
        setTimeout(() => {
          window.location.href = '/'
        }, 1000)
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.error(error)
      toast.error(error.response?.data?.message || "Login failed")
    }
  }

  return (
    <div>
      <h1 className='heading'>Login</h1>
      <form className='form-container'>
        <input
          type='email'
          placeholder='Email'
          className='input-box'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type='password'  // <-- corrected
          placeholder='Password'
          className='input-box'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type='button'
          className='btn1'
          onClick={login}
        >
          Login
        </button>
      </form>

      <Link to='/signup' className='signup'>Don't have an account? Signup</Link>

      <Toaster />
    </div>
  )
}

export default Login
