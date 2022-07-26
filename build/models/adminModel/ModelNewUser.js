"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModelNewUser = void 0;
const mongoose_1 = require("mongoose");
const NewUserSchema = new mongoose_1.Schema({
    role: {
        type: Number,
        required: true
    },
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    mobileNum: {
        type: Number,
        required: true,
        unique: true,
        // min:10,
        // max:10
    },
    password: {
        type: String,
        required: true
    },
    username: {
        type: String
    },
    father_name: {
        type: String
    },
    mother_name: {
        type: String
    },
}, {
    timestamps: true
});
const ModelNewUser = (0, mongoose_1.model)('New_User', NewUserSchema);
exports.ModelNewUser = ModelNewUser;
