const {validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

exports.register = (req, res, next)=>{
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    const error = new Error('Validation failed.');
    error.statusCode=422;
    error.data =errors.array();
    throw error;
  }
  const email = req.body.email;
  const password= req.body.password;
  bcrypt
  .hash(password,12)
  .then(hashedPw=>{
    const user = new User({
      email:email,
      password: hashedPw
    })
    return user.save();
  })
  .then(result=>{
    res.status(201).json({message: 'user created!',userId: result._id});
  })
  .catch(err => {
    if(!err.statusCode){
      err.statusCode=500;
    }
    next(err);
  })
}
exports.login = (req, res, next)=>{
  const email = req.body.email;
  const password = req.body.password;
  let loadedUser;
  User.findOne({email:email})
  .then(user=>{
    if(!user){
      const error = new Error('This email is not registered.');
      error.statusCode= 401;
      throw error;
    }
    loadedUser=user;
    return bcrypt.compare(password, user.password);
  })
  .then(isEqual=>{
    if(!isEqual){
      const error = new Error('Worng password!');
      error.statusCode= 401;
      throw error;
    }
    const token = jwt.sign({
      email:loadedUser.email,
      userId: loadedUser._id.toString()
    },"ristricted",
    {expiresIn:'1h'}
    );
    res.status(200).json({ token:token, userId: loadedUser._id.toString() });
  })
  .catch(err => {
    if(!err.statusCode){
      err.statusCode=500;
    }
    next(err);
  })
}
exports.logout=(req, res, next) => {
  const postId=req.params.postId;
  User.findById(postId)
  .then(result=>{
    res.status(200).json({message:'logout successfully',postId:result});
})
.catch(err=>{
  if(!err.statusCode){
    err.statusCode=500;
  }
  next(err);
});
}






//   Leave.findById(postId)
//  .then(newLeave=>{
//   if(!newLeave){
//     const error=new Error('Id is not existed')
//     error.statusCode=404;
//     throw error;
//   }
//   newLeave.employeeName = employeeName;
//   newLeave.employeeData = employeeData;
//   return post.save();
// })
// .then(result=>{
//   res.status(200).json({message:'leave applyed successfully',newLeave:result});
// })
// .catch(err=>{
//   if(!err.statusCode){
//     err.statusCode=500;
//   }
//   next(err);
// });
