"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModelTransaction = void 0;
const mongoose_1 = require("mongoose");
const NewTransactionSchema = new mongoose_1.Schema({
    feeType: {
        type: Number,
        enum: [1, 2, 3],
        required: true
    },
    feeAmount: {
        type: Number,
        required: true
    },
    transactionId: {
        type: String
    },
    classId: {
        type: mongoose_1.Schema.Types.ObjectId, ref: "Class_Or_Cources"
    },
    studentId: {
        type: mongoose_1.Schema.Types.ObjectId, ref: "New_User"
    }
}, {
    timestamps: true
});
const ModelTransaction = (0, mongoose_1.model)("Transaction_history", NewTransactionSchema);
exports.ModelTransaction = ModelTransaction;
