"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validations = void 0;
const joi_1 = __importDefault(require("joi"));
// import joi.objectId from 
// joi['objectId'] = require('joi-objectid')(joi)
class adminvalidations {
    constructor() {
        this.newUserSchema = joi_1.default.object({
            role: joi_1.default.number().valid(1, 2, 3).required(),
            fname: joi_1.default.string().min(3).required(),
            lname: joi_1.default.string().min(3).required(),
            email: joi_1.default.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
            mobileNum: joi_1.default.number().min(1000000000).max(9999999999).required(),
            password: joi_1.default.string().min(3).max(15).required(),
            father_name: joi_1.default.string(),
            mother_name: joi_1.default.string(),
            parentnumber: joi_1.default.number().min(1000000000).max(9999999999)
        });
        this.newCourseSchema = joi_1.default.object({
            class: joi_1.default.number().required(),
            Admission_Fee: joi_1.default.number().required(),
            class_code: joi_1.default.string().required(),
            Monthly_Fee: joi_1.default.number().required()
        });
        this.newStudentSchema = joi_1.default.object({
            userId: joi_1.default.string().hex().length(24).required(),
            classId: joi_1.default.string().hex().length(24).required().error(() => Error("Class Id is not valid")),
        });
        this.transactionSchema = joi_1.default.object({
            fee_type: joi_1.default.number().valid(1, 2, 3).required(),
            fee_amount: joi_1.default.number().required(),
            classId: joi_1.default.string().hex().length(24),
            studentId: joi_1.default.string().hex().length(24)
        });
    }
}
exports.validations = new adminvalidations();
// module.exports = { newUserSchema:newUserSchema,
// newCourseSchema:newCourseSchema,
// newStudentSchema,
// transactionSchema:transactionSchema}
