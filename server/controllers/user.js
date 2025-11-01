import User from "./../models/User.js";

const signup = async (req,res)=>{
    const {name,email,password,dob} = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "name, email and password are required",
    });
  }
  //regex validations
  const emailValidationRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const nameValidationRegex = /^[a-zA-Z ]+$/;
  const passwordValidationRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

      if (nameValidationRegex.test(name) === false) {
    return res.status(400).json({
      success: false,
      message: "Name should contain only alphabets and spaces",
    });
  }

  if (emailValidationRegex.test(email) == false) {
    return res.status(400).json({
      success: false,
      message: "Email is not valid",
    });
  }

  if (passwordValidationRegex.test(password) === false) {
    return res.status(400).json({
      success: false,
      message:
        "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character",
    });
  }

  //existness 
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({
      success: false,
      message: `User with email ${email} already exists`,
    });
  }

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

const login =async (req,res)=>{
  
    const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "email and password are required",
    });
  }

    const user = await User.findOne({
      email: email,
      password: password
    });
  
    if (user) {
      return res.json({
        success: true,
        message: "Login successful🙂",
        data: user
      })
    }
    else {
      return res.json({
        success: false,
        message: "Invalid input !!!!!🤨",
        data: null
      })
    }
}

export {signup,login}