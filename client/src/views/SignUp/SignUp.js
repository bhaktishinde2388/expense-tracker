import React, { useState } from 'react'
import "./SignUp.css"
import toast, { Toaster } from 'react-hot-toast'
import axios from 'axios'

function SignUp() {
  const [name,setName] = useState("")
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState(0)
  const [dob,setDob] = useState("")
 
  const signup = async ()=>{
    toast.loading("registerd.......")
    if(!name || !email || !password || !dob){
      toast.error("plaese enter all detail")

      return
    }

    const response = await axios.post(`${process.env.REACT_APP_API_URL}/signup`, {
      name:name,
      email:email,
      password:password,
      dob:dob,
    })

    toast.dismiss()
    if(response.data.success){
   toast.success(response.data.message)
   setName("")
   setEmail("")
   setPassword("")
   setDob("")
  
  }
  else{
    toast.error(response.data.message)
  }
}

  return (
    <div>
        <h1 className='heading'>User Registration</h1>

        <form className='form-container'>
            <input type="text"
             placeholder="Enter Full Name"
              className='input-box'
              value={name}
              onChange={(e)=>setName(e.target.value)}
            />


            <input type='date'
             placeholder='Enter Date Of Birth'
              className='input-box'
              value={dob}
              onChange={(e)=>setDob(e.target.value)}
              />


            <input type='email'
             placeholder='Enter Email' 
              className='input-box'
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              
              />


            <input type='text' 
            placeholder='Enter Password'
              className='input-box'
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
             
              />

            <button type='button' 
            className='btn1'
            onClick={signup}
            >Register</button>
        </form> 
        <Toaster/>
    </div>
  )
}

export default SignUp



// OR

// import React, { useState } from 'react'
// import "./SignUp.css"
// import toast, { Toaster } from 'react-hot-toast'
// import axios from 'axios'
// import { Link } from 'react-router-dom'
// function SignUp() {

//   const [user, setUser] = useState({
//     name: '',
//     email: '',
//     password: '',
//     dob: ''
//   })

//   const signup = async () => {
//     const response = await axios.post(`${process.env.REACT_APP_API_URL}/signup`, {
//       name: user.name,
//       email: user.email,
//       password: user.password,
//       dob: user.dob
//     })

//     if(response.data.success){
//       toast.success(response.data.message)

//       setUser({
//         name: '',
//         email: '',
//         password: '',
//         dob: ''
//       })
//     }
//     else{
//       toast.error(response.data.message)
//     }
//   }
//   return (
//     <div>
//       <h1 className='auth-heading'>User Registration</h1>

//               <form className='signup-form-container'>
//         <input type="text"
//              placeholder="Enter Full Name"
//               className='input-box'
//           value={user.name}
//           onChange={(e) => setUser({ ...user, name: e.target.value})}
//           />

//          <input type='text'
//              placeholder='Enter Email' 
//               className='input-box'
//           value={user.email}
//           onChange={(e)=>setUser({...user, email: e.target.value})}
//           />

//         placeholder='Enter Password'
//               className='input-box'
//           value={user.password}
//           onChange={(e)=>setUser({...user, password: e.target.value})}
//           />

//          <input type='date'
//              placeholder='Enter Date Of Birth'
//               className='input-box'
//           value={user.dob}
//           onChange={(e)=>setUser({...user, dob: e.target.value})}
//           />

//         <button
//           type='button'
//           className='btn-auth'
//           onClick={signup}
//           >
//           Register
//         </button>
//       </form>

//       <Link to='/login' className='auth-link'>Already have an account? Login</Link>

//       <Toaster />
//     </div>
//   )
// }
// export default SignUp