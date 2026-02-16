import User from "./../models/User.js";



// SIGNUP
const signup = async (req, res) => {
  const { name, email, password, dob } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "name, email and password are required",
    });
  }

  // regex validations
  const emailValidationRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const nameValidationRegex = /^[a-zA-Z ]+$/;
  const passwordValidationRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

  if (!nameValidationRegex.test(name) ) {
    return res.status(400).json({
      success: false,
      message: "Name should contain only alphabets and spaces",
    });
  }

  if (!emailValidationRegex.test(email)) {
    return res.status(400).json({
      success: false,
      message: "Email is not valid",
    });
  }

  if (!passwordValidationRegex.test(password) ) {
    return res.status(400).json({
      success: false,
      message:
        "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character",
    });
  }

  // check if user exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({
      success: false,
      message: `User with email ${email} already exists`,
    });
  }

  // create user
   // create user
  const user = await User.create({
    name,
    email,
    password,
    dob: new Date(dob),
  });

  try {
    const token = user.generateToken();
    if (!token) {
      return res.status(500).json({
        success: false,
        message: "Token generation failed",
      });
    }

    res.json({
      success: true,
      message: "Signup successful!",
      userId: user._id.toString(),
      token, // JWT
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: e.message,
      data: null,
    });
  }
};

// LOGIN
const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "email and password are required",
    });
  }

  const user = await User.findOne({ email, password });

  if (user) {
    const token = user.generateToken();
    return res.json({
      success: true,
      message: "Login successful 🙂",
      userId: user._id.toString(),
      token,
    });
  } else {
    return res.status(400).json({
      success: false,
      message: "Invalid email or password",
      data: null,
    });
  }
};


export { signup, login };