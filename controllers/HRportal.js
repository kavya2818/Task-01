const {validationResult} = require('express-validator');
const Post = require('../models/post');

exports.createPost = (req, res, next)=>{
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    const error = new Error('Validation failed, entered data is incorrect.');
    error.statusCode=422;
    throw error;
  }
  const employeeName = req.body.employeeName;
  const employeeData = req.body.employeeData;
  const post = new Post({
    employeeName: employeeName, 
    employeeData: employeeData,
  });
  post
    .save()
    .then(result => {
      res.status(201).json({
        message: 'Employee details created successfully!',
        post: result
      });
    })
    .catch(err => {
      if(!err.statusCode){
        err.statusCode=500;
      }
      next(err);
    });
};

exports.getEmployee = (req,res,next)=>{
  Post.find()
  .then(Employee=>{
    res.status(200).json({message:'Fetched employees successful',Employee:Employee});
    })
  .catch(err=>{
    if(!err.statusCode){
      err.statusCode=500;
    }
    next(err);
  });
};

exports.updatePost=(req,res,next)=>{
  const postId=req.params.postId;
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    const error = new Error('Validation failed, entered data is incorrect.');
    error.statusCode=422;
    throw error;
  }
  const employeeName = req.body.employeeName;
  const employeeData = req.body.employeeData;
Post.findById(postId)
 .then(post=>{
  if(!post){
    const error=new Error('Could not find post.')
    error.statusCode=404;
    throw error;
  }
  post.employeeName = employeeName;
  post.employeeData = employeeData;
  return post.save();
})
.then(result=>{
  res.status(200).json({message:'Post updated!',post:result});
})
.catch(err=>{
  if(!err.statusCode){
    err.statusCode=500;
  }
  next(err);
});
}

exports.deletePost=(req,res,next)=>{
  const postId=req.params.postId;
  Post.findByIdAndDelete(postId)
  .then(post=>{
    if(!post){
      const error=new Error('Could not find post.')
      error.statusCode=404;
      throw error;
    }
    })
    .then(result=>{
      //console.log(result)
      res.status(200).json({message:'Delete post'});
    })
    .catch(err=>{
      if(!err.statusCode){
        err.statusCode=500;
      }
      next(err);
  })
}

