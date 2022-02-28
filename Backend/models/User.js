const mongoose = require('mongoose');
const { Schema } = mongoose;
const Userchema = new Schema({
    name:{
        type : String,
        requird : true
    },
    email:{
        type : String,
        requird : true,
        unique: true
    },
    date:{
        type : Date,
        default: Date.now
    },
    password:{
        type : String,
        requird : true
    }
  });
  const user=mongoose.model('user',Userchema);
  user.createIndexes();
  module.exports = user;