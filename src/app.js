const {connectDB}= require('./config/database');
const express = require('express');
const app = express();
const User =require('./models/user')



connectDB().then(()=>{
    console.log("db connect");
    app.listen(7777,()=>{
        console.log("Server Started");
    });
}).catch(()=>{
    console.log("error connecting to database");
});

app.post("/signup",async(req,res)=>{
   
    const user = new User({
        firstName:"Ayush",
        secondName:"Kumar",
        email:"ayush@yadav.com",
        age:"20"
    });

   await user.save();
    res.send("user added successfully")

});


app.use("/admin/getUserData",(err,req,res,next)=>{
    next();
    res.send("sent all user data")
});


app.use("/admin",(req,res)=>{
    res.send("hello admin")
});
