"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userController_1 = __importDefault(require("./userController"));
const adminController_1 = __importDefault(require("./adminController"));
exports.default = {
    userController: userController_1.default,
    adminController: adminController_1.default
};
