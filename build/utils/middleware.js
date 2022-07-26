"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const helperFun_1 = require("./helperFun");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
function err_create(req, res, next) {
    const err = new Error("route not found");
    const resp = new helperFun_1.error_Object(err.message, http_status_codes_1.default.NOT_FOUND);
    console.log(err.message, "create side");
    next(resp);
}
function handle_err(err, req, res, next) {
    console.log(err.stack, "handle side");
    console.log(err, "errrr");
    if (err.name === "MongoServerError" || err.code === 11000) {
        res.status(err.Status_Code).json({
            message: "Duplicate Value or User Details Already exists",
            error: err.keyValue,
            status_code: err.Status_Code || http_status_codes_1.default.UNPROCESSABLE_ENTITY,
            stack: err.stack
        });
    }
    else {
        res.status(err.Status_Code).json({
            message: err.message ? err.message : err,
            status_code: err.Status_Code || http_status_codes_1.default.BAD_REQUEST,
            stack: err.stack
        });
    }
}
exports.default = {
    err_create,
    handle_err,
};
