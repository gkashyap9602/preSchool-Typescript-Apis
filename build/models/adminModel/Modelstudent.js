"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModelNewStudent = void 0;
const mongoose_1 = require("mongoose");
const NewStudentSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId, ref: "New_User",
        required: true
    },
    classId: {
        type: mongoose_1.Schema.Types.ObjectId, ref: "Class_Or_Cources",
        required: true
    },
    rollNum: {
        type: String
    },
    IsActive: {
        type: String,
        default: false
    },
    total_due_fee: {
        type: Number,
        default: 0
    },
}, {
    timestamps: true
});
const ModelNewStudent = (0, mongoose_1.model)("New_Student", NewStudentSchema);
exports.ModelNewStudent = ModelNewStudent;
