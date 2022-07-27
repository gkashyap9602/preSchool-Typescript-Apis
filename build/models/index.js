"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminModels = exports.UserModels = void 0;
const index_1 = __importDefault(require("./userModel/index"));
exports.UserModels = index_1.default;
const index_2 = __importDefault(require("./adminModel/index"));
exports.AdminModels = index_2.default;
