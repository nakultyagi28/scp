const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtKey = "my_secret_key"
// Load User model
const User = require('../../models/User');



// @route GET api/books/:id
// @description Get single book by id
// @access Public
router.post('/login',(req,res) =>{
  console.log('inside login')
  const userLoggingIn = req.body;
  console.log('userLoggingIn::::::::::::',userLoggingIn)

  User.findOne({email:userLoggingIn.email}).then(dbUser =>{
      if(!dbUser){
  console.log('dbUser::::::::::::',dbUser)

          return res.json({
              message:"Invalid Username or Password",
              status:401
          })
      }
      bcrypt.compare(userLoggingIn.password, dbUser.password).then(isCorrect => {
  console.log('bcrypt::::::::::::')

          if(isCorrect){
              const payload = {
                  id:dbUser._id,
                  email:dbUser.email,
              }
  console.log('payload::::::::::::',payload)
//   console.log('process::::::::::::',process)
//   console.log('process::::::::::::',process.env)
//   console.log('process::::::::::::',process.env.JWT_SECRET)
              jwt.sign(
                  payload,
                  jwtKey,
                  {expiresIn:86400},
                  (err,token) => {
                      if(err) return res.json({message:err})
  console.log('Success::::::::::::')
                      return res.json({
                          message:"Success",
                          token:"Bearer " + token,
                          username:payload.email,
                          status:200
                      })
                  }
              )
          }else{
              return res.json({message: "Invalid Username or Password",
              status:401
            })
          }
      })
  })
})
// @route GET api/books
// @description add/save book
// @access Public
router.post('/register',async(req,res) =>{
  const user = req.body;
  console.log('user::::::::::::',user)

  // check if username or email has been taken by other user already
//   const takenUsername = await User.findOne({username:user.username})
  const takenEmail = await User.findOne({email:user.user})

  if( takenEmail){
      res.json({message: "Username or Email already exists",status:401})
  }else{
      user.password = await bcrypt.hash(req.body.pwd, 10)
      console.log('user.password::::::::::::',user.password)
      const dbUser = new User({
          email: user.user,
          password: user.password
      })
      console.log('dbUser::::::::::::',dbUser.email)

      dbUser.save()
          res.json({message:"Success",status:200})
  }
})



module.exports = router;
