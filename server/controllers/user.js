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
      message: `Signup successful`,
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


export {signup}