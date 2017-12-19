const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const database = require('../../database/config');
const User = require('../../models/user/user');

//Retrieve data
router.get('/user', (req, res, next)=>{
  User.find(function(err, user){
    res.json(user);
  });
});

//Add data
router.post('/user', (req, res, next)=>{
  let newUser = new User({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    user_name: req.body.user_name,
    password:req.body.password
  });

  User.addUser(newUser, (err, user) => {
    if(err){
      res.json({success: false, msg: 'Failed to save User Data'});
    }
    else{
      res.json({success: true, msg: 'User Data saved'});
    }
  });
});


//Auth user
router.post('/authenticate', (req, res, next) => {
    const user_name = req.body.user_name;
    const password = req.body.password;

  User.getUserByUsername(user_name, (err, user)=>{
    if(err) throw err;
    if(!user){
      return res.json({success: false, msg: 'User not found'});
    }

    User.comparePassword(password, user.password, (err, isMatch) => {
      if(err) throw err;
      if(isMatch){
        const token = jwt.sign(user.toJSON(), database.secret, {
          expiresIn: 604800 // 1 week
        });

        res.json({
          success: true,
          token: 'JWT '+token,
          user: {
            id: user._id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            user_name: user.user_name
          }
        });
      }
      else {
            return res.json({success: false, msg: 'Wrong password'});
      }
    });
  });
});

//Protected Route Needs passport.authenticate('jwt', {session:false})
router.get('/authLunch', passport.authenticate('jwt', {session:false}), (req, res, next) => {
  res.json({user: req.user});
});

router.get('/authClient', passport.authenticate('jwt', {session:false}), (req, res, next) => {
  res.json({user: req.user});
});

module.exports = router;
