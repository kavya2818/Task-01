const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email:{
    type:String,
    required: true
  },
  password:{
    type:String,
    required:true
  }
  // requested_by: {
  //     type:mongoose.Schema.Types.ObjectId,
  //     ref: "Post"
  //   }
  
});
module.exports=mongoose.model('User',userSchema);