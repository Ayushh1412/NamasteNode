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
// app.use("/(ab)+c?",(req,res)=>{
//     //it will work on abc or ab or abababab...c or abababab.....
//     res.send("testing route address using + \n it will work on abc or ab or abababab...c or abababab.....")
// });
// app.use("/(ab)*c?",(req,res)=>{
//     //it will work on anything starts from ab and ends with c ab........c
//     res.send("testing route address using * and  ? \n it will work on anything starts from ab and ends with c ab........c")
// });
// app.use(/.*fly$/ ,(req,res)=>{
//     //it will work on anything that ends with fly
//     res.send("testing regex \napp.use(/.*fly$/ ,(req,res)=>{}); \nin route address \n it will work on anything that ends with fly")
// });
// app.get(/a/,(req,res)=>{
//     //it will work on anything that includes a  --app.use is not working--
//     res.send("testing regex \napp.get(/a/,(req,res)=>{}); \nin route address \n  //it will work on anything that includes a")
// });


app.use("/",(err,req,res,next)=>{
if(err){
    res.status(500).send("something went wrong (message by wildcard error handling) ")
}
});