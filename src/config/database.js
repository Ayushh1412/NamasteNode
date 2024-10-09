const db = require('mongoose');


const connectDB = async()=> { 
    await db.connect('mongodb+srv://ayushh1412:C5TUsEnKZ14NtLRJ@devtinder.tahpf.mongodb.net/devTinder')
}
module.exports={connectDB}


