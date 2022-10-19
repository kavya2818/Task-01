const express = require("express")
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const morgan = require('morgan');

const HRportalRoutes = require("./routes/HRportal");
const userRoutes = require("./routes/user");

const app = express();
app.use(morgan('dev'));

app.use(bodyParser.json());
app.use((req,res,next)=>{
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,PATCH,DELETE');
  res.setHeader('Access-Control-Allow-Headers','Content-Type,Authorization');
  next();
})
app.use('/HRportal',HRportalRoutes);
app.use('/user',userRoutes);

app.use((error,req, res, next)=>{
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({message:message, data:data});
});

mongoose.connect('mongodb+srv://Kavyaramachandra:Rkavya%40123@cluster0.0bux4cc.mongodb.net/network?retryWrites=true&w=majority',{useNewUrlParser:true})
.then(result=>{
 app.listen(7000);
})
.catch(err=>console.log(err));
