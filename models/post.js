const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
  employeeName:{
    type:String,
    required: true
  },
  employeeData:{
    type:String,
    required:true
  }
  // requested_by: {
  //     type:mongoose.Schema.Types.ObjectId,
  //     ref: "User",
  //     required:true
  //   },
  
});
module.exports=mongoose.model('Post',employeeSchema);