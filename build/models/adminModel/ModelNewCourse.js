"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModelNewCource = void 0;
const mongoose_1 = require("mongoose");
const NewCourceSchema = new mongoose_1.Schema({
    Class: {
        type: String,
        required: true,
    },
    Admission_Fee: {
        type: Number,
        required: true,
    },
    Class_Code: {
        type: String,
        required: true,
    },
    Monthly_Fee: {
        type: Number,
        required: true,
    },
}, {
    timestamps: true
});
const ModelNewCource = (0, mongoose_1.model)("Class_Or_Cources", NewCourceSchema);
exports.ModelNewCource = ModelNewCource;
