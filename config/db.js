const mongoose=require("mongoose");
const dotenv=require("dotenv").config();
const connectDb=async ()=>{
try{
    await mongoose.connect(process.env.CONNECTION_STRING,
     );
console.log("mongoDb connected");
}
catch(err){
 console.error(err.message);
 process.exit(1);
}
};

module.exports=connectDb;