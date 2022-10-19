const express = require("express");
const {body}=require('express-validator');
const HRportalController =require('../controllers/HRportal');

const router = express.Router();

router.post('/post',[
  body('employeeName').trim().isLength({min:5}),
  body('employeeData').trim().isLength({min:5}),
],
HRportalController.createPost);

router.get("/fetchEmployee",HRportalController.getEmployee);

router.put('/post/:postId',[
  body('employeeName').trim().isLength({min:5}),
  body('employeeData').trim().isLength({min:5}),
],HRportalController.updatePost);

router.delete('/post/:postId',HRportalController.deletePost)

module.exports = router;
