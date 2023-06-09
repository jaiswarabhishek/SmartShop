const mongoose = require('mongoose');
console.log(process.env.MONGODB_URI)

async function connectDB(){
    try{
        await mongoose.connect(process.env.MONGODB_URI,{useNewUrlParser:true});
        console.log("MongoDB connected to a database successfully....");

    }
    catch(err){
        console.log(err);
        process.exit(1);
    }
}

module.exports = connectDB;