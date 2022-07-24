"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const url = "mongodb+srv://gkashyap9602:anilkush@cluster0.hp9xj.mongodb.net/PreSchoolTypeScript";
// "mongodb://localhost:27017/blockbrew"
// "mongodb://localhost:27017/SchoolDBTypescript"
function connection() {
    mongoose_1.default.connect(url, function (err) {
        if (err)
            throw err;
        //    console.log(err);
        console.log("connected successfully database side");
    });
}
const db = mongoose_1.default.connection;
exports.default = { db, connection };
// db.createCollection("Users_Data",(err,res)=>{
// if (err) throw (err)
// console.log("Collection Created Successfully " + res);
// })
