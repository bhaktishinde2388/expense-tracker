import User from "../models/User.js";

const signup = async (req,res)=>{
    const {name,email,password,dob} = req.body;

    const user = new User({
        name,
        email,
        password,
        dob:new Date(dob)
    });
    
 
      try {
    const savedUser = await user.save();

    res.json({
      success: true,
      message: `Signup successfully...........`,
      data: savedUser
    })
  }
  catch (e) {
    res.json({
      success: false,
      message: e.message,
      data: null
    })
  }
}



// login

// const login =async (req,res)=>{
  
//     const { email, password } = req.body;

//     const user = await User.findOne({
//       email: email,
//       password: password
//     });
  
//     if (user) {
//       return res.json({
//         success: true,
//         message: "Login successful🙂",
//         data: user
//       })
//     }
//     else {
//       return res.json({
//         success: false,
//         message: "Invalid input !!!!!🤨",
//         data: null
//       })
//     }
// }


const login = async () => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/login`, {
      email,
      password
    });
    if (response.data.success) {
      toast.success(response.data.message);
      localStorage.setItem('currentUser', JSON.stringify(response.data.data));
      toast.loading('Redirecting to dashboard...');
      setTimeout(() => window.location.href = '/', 3000);
    } else {
      toast.error(response.data.message);
    }
  } catch (error) {
    toast.error("Something went wrong!");
    console.error(error);
  }
};

export {signup,
    login
}