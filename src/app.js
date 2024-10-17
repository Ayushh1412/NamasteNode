const {connectDB}= require('./config/database');
const express = require('express');
const app = express();
const User =require('./models/user')
const {adminAuth,userAuth} = require('./middlewares/auth')



connectDB().then(()=>{
    console.log("db connect");
    app.listen(7777,()=>{
        console.log("Server Started");
    });
}).catch(()=>{
    console.log("error connecting to database");
});

app.use(express.json());
app.post("/signup",async(req,res)=>{
    const user = new User(req.body);
    try{ 
     await user.save();
     res.send("user added successfully")
    }catch(err){
    res.status(400).send("Error saving the user"+ err.message);
    }
  

});

app.get("/user/:token/:age",userAuth,async(req,res)=>{
    
    try{
    // const userdata =  await User.find({firstName:'ishita'}).collation({ locale: 'en', strength: 2 });
    // const userdata =  await User.find({firstName:/ishita/i});
    const userdata =  await User.find({firstName:req.query.name}).collation({ locale: 'en', strength: 2 });
    if(userdata.length===0)
    {
        res.status(400).send("sorry ,No users found");
    }
    else {
        res.send(userdata);
    }
    }
catch(err){
    res.status(400).send("Error getting the users data   \n"+ err.message);
}
    
});

// app.use("/admin",(req,res,next)=>{
// try{
    
//     throw new Error("dummy error");
//     next();
// } 
// catch{
//     res.status(500).send("something went wrong (message by try catch error handling) ")

// }
// });
app.use("/admin",adminAuth);
app.use("/admin",(req,res)=>{
    // throw new Error("dummy error");
    res.send("hello adminhvh")
});

app.use("/",(err,req,res,next)=>{
if(err){
    res.status(500).send("something went wrong (message by wildcard error handling) ")
}
});