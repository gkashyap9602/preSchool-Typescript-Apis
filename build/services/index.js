"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const EmailService_1 = require("./EmailService");
const FileUploadService_1 = __importDefault(require("./FileUploadService"));
exports.default = { mailer: EmailService_1.mailer, FileUpload: FileUploadService_1.default };
