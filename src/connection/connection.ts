import mongoose from "mongoose";

const url =
  "mongodb+srv://gkashyap9602:anilkush@cluster0.hp9xj.mongodb.net/PreSchoolTypeScript";
// "mongodb://localhost:27017/blockbrew"
// "mongodb://localhost:27017/SchoolDBTypescript"

function connection() {
  mongoose.connect(url, function (err) {
    if (err) throw err;
    //    console.log(err);
    console.log("connected successfully database side");
  });
}

const db = mongoose.connection;

export default { db, connection };

// db.createCollection("Users_Data",(err,res)=>{
// if (err) throw (err)
// console.log("Collection Created Successfully " + res);
// })
