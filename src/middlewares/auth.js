 const adminAuth = (req,res,next)=>{
    const token = "xyz";
    const isAdminAuthorized = token==="xyz";
    if(!isAdminAuthorized){
        res.status(400).send("sorry you don't have admin authorization ")
    }
    else{
        next();
    }
}

const userAuth = (req,res,next)=>{
    console.log("params are")
    console.log(req.params);
    console.log("queries are");
    console.log(req.query);

    const token = req.params.token;
    const isUserAuthorized = token==="Ayush@123";
    if(!isUserAuthorized){
        res.status(400).send("sorry you are not a authorized user ")
    }
    else{
        next();
    }
}

module.exports={
    adminAuth,
    userAuth,
}