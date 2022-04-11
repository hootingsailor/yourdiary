const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');

router.post('/createuser' ,[
    body('name').isLength({ min: 3 }),
    body('email').isEmail(),
    body('password').isLength({ min: 5 }),
], async(req , res) => {
  // If error retrun bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } 
    // Check whether user with the given email already exists 
    try {
    let user = await User.findOne({email : req.body.email});
    if(user){
      return res.status(400).json({error : "Sorry a user with this email aready exists!"})
    }
    user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      })
    res.json(user)
  } catch (error) {
      console.error(error.message);
      res.status(500).send("Some error occured");
  }
})

module.exports = router