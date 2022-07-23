"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModelUser = void 0;
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
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    username: {
        type: String
    },
    gender: {
        type: String
    },
    father_name: {
        type: String
    },
    religion: {
        type: String
    }
});
const ModelUser = (0, mongoose_1.model)('NewUser', NewUserSchema);
exports.ModelUser = ModelUser;
