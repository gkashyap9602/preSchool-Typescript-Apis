"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ModelNewUser_1 = require("./ModelNewUser");
const ModelNewStudent_1 = require("./ModelNewStudent");
const ModelNewCourse_1 = require("./ModelNewCourse");
const Modeltransaction_1 = require("./Modeltransaction");
exports.default = {
    ModelNewUser: ModelNewUser_1.ModelNewUser,
    ModelTransaction: Modeltransaction_1.ModelTransaction,
    ModelNewCource: ModelNewCourse_1.ModelNewCource,
    ModelNewStudent: ModelNewStudent_1.ModelNewStudent
};
