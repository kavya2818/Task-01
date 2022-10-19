const express = require('express');
const {body}=require('express-validator');
const User = require('../models/user')
const userController=require('../controllers/user')
const leaveController=require('../controllers/leave')

const router = express.Router();

router.put('/register',
[
  body('email')
  .isEmail()
  .withMessage('please enter a valid email.')
  .custom((value,{req})=>{
    return User.findOne({email: value})
    .then(userDoc=>{
      if(userDoc){
        return Promise.reject('E-mail address already exists!')
      }
    })
  })
  .normalizeEmail(),
 body('password')
.trim()
.isLength({min:7}),
],
userController.register);

router.post('/login',userController.login);

router.get('/logout/:postId',userController.logout);

router.post('/leave',leaveController.leave);

router.post('/balance',leaveController.balance);

module.exports = router;
