"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.response_handler = exports.object_id_check = exports.resp_Object = exports.error_Object = void 0;
const message_1 = require("./message");
class error_Object {
    constructor(message, Status_Code) {
        (this.message = message), (this.Status_Code = Status_Code);
        Error.captureStackTrace(this, this.constructor);
        //  console.log(this);
    }
}
exports.error_Object = error_Object;
class resp_Object extends error_Object {
    constructor(message, Status_Code, result) {
        super(message, Status_Code);
        this.result = result;
    }
}
exports.resp_Object = resp_Object;
function response_handler(Fun_Response, res_http) {
    console.log("res handler side");
    return res_http.status(Fun_Response.Status_Code).json({
        message: Fun_Response.message,
        Status_Code: Fun_Response.Status_Code,
        result: Fun_Response.result
    });
}
exports.response_handler = response_handler;
function object_id_check(user_id, res) {
    if (user_id.length < 24 || user_id.length > 24) {
        return res.status(417).json({ message: message_1.MESSAGES.INVALID_ID_PLEASE_CHECK, Status_Code: 417 });
    }
}
exports.object_id_check = object_id_check;
