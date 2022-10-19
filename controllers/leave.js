const {validationResult} = require('express-validator');
const Leave = require('../models/leave');

exports.leave=(req, res, next) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    const error = new Error('Validation failed, entered data is incorrect.');
    error.statusCode=422;
    throw error;
  }
  const employeeName = req.body.employeeName;
  const start_date = req.body.start_date;
  const end_date = req.body.end_date;
  const leave_type = req.body.leave_type;
  const newLeave = new Leave({
    employeeName:employeeName,
    start_date:start_date, 
    end_date:end_date, 
    leave_type:leave_type,
  });
  newLeave
  .save()
  .then(result => {
    res.status(201).json({
      message: 'leave applyed successfully',
      post: result
    });
  })
  .catch(err => {
    if(!err.statusCode){
      err.statusCode=500;
    }
    next(err);
  });
}

exports.balance=(req, res, next) => {
  const postId=req.params.postId;
  User.findOne(postId)
  .then(result=>{
    res.status(200).json({message:'remaining balance',postId:result});
})
.catch(err=>{
  if(!err.statusCode){
    err.statusCode=500;
  }
  next(err);
});
}

