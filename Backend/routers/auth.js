const express = require('express');
const router = express.Router();
const User = require ('../models/User')
const fetchuser = require ('../midleware/fetchuser')

const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require ('jsonwebtoken')
const JWT_SECRET = 'Amanisagoodboy';


// Route1: create a user using:POST
router.post('/createuser',[
 body('email',"Enter a valid Email").isEmail(),
 body('name',"Enter a valid Name").isLength({ min: 3 }),
 body('password',"password must be at least 5 characters").isLength({ min: 5 })]    
,async(req,res)=>{
  // if there are errors,return bad request and the error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    try {
      
    // check whether the email is already exitts or not
    let user = await   User.findOne({email:req.body.email})
    if(user){
            return res.status(400).json({error:"please try to login with correct credentials" })
    }

    const salt =await bcrypt.genSalt(10);
    const secPassword =await bcrypt.hash(req.body.password, salt);

    // create a new user
     user =await User.create({
        name: req.body.name,
        password: secPassword,
        email: req.body.email,
      })
      const data={ 
      user:{id:user.id}
      }
      const authtoken = jwt.sign(data,JWT_SECRET)
      res.json({authtoken})
      // .then(user => res.json(user))
      // catch error
    } catch (error) {
      console.error(error.message);
      res.status(500).send("some error occured");
    }
})




//Route 2: authentciate a login using:POST "/api/auth/logon".no login required
router.post('/login',[
 body('email',"Enter a valid Email").isEmail(),
 body('password',"password cannot be blank").exists()
]
,async(req,res)=>{
  let success=false
  // if there are errors,return bad request and the error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
const {email,password}=req.body;   
try {
  let user =await User.findOne({email});
  if(!user){
    success=false
    return res.status(400).json({success,error:"sorry user does not exits"})
  }
  const passwordCompare =await bcrypt.compare(password,user.password);
    if(!passwordCompare){
      success=false
      return res.status(400).json({success,error:"please try to login with correct credentials" })
    }
  const data={
      user:{id:user.id}
    }
    const authtoken =jwt.sign(data,JWT_SECRET)
     success=true;
    res.json({success,authtoken})
} catch (error) {
  console.error(error.message);
      res.status(500).send("some error occured");
}
  })



//Route 3: authentciate a logged in using:POST "/api/auth/getuser". login required

router.post('/getuser',fetchuser
 ,async(req,res)=>{
   try {
     userId=req.user.id 
const user = await User.findById(userId).select("-password")
res.send(user)  
} catch (error) {
  console.error(error.message);
      res.status(500).send("some error occured");
}
 })
module.exports=router;