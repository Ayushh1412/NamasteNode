const mongoose = require('mongoose');

const userSchema= new mongoose.Schema({
    firstName:{
        type:String
    },
    lastName:{
        type:String
    },
    age:{
        type:Number
    },
    email:{
        type:String
    }

},{
    timestamps : true
});

module.exports = mongoose.model("User",userSchema);