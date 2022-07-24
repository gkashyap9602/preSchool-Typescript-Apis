"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.random_Otpfun = exports.genAuthToken = exports.verify_token = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config/config");
// Generate jwt token each time
function genAuthToken(_id) {
    try {
        const Access_token = jsonwebtoken_1.default.sign({ _id: _id }, config_1.Access_token_SecretKey, { expiresIn: "1m" });
        //   console.log(Access_token, "Access token generated ");
        const refresh_token = jsonwebtoken_1.default.sign({ _id: _id }, config_1.refresh_token_SecretKey, { expiresIn: "7d" });
        //   console.log(refresh_token, "Refresh token generated ");
        return { Access_token, refresh_token };
    }
    catch (error) {
        console.log("genrate side error", error);
    }
}
exports.genAuthToken = genAuthToken;
// Verification of jwt token
function verify_token(req, res, next) {
    let token = req.header("Authorization");
    if (!token)
        throw { message: "Please Enter Access Token" };
    console.log(token + "verify side token");
    if (token.toLowerCase().startsWith('bearer')) {
        token = token.slice('bearer'.length).trim();
    }
    jsonwebtoken_1.default.verify(token, config_1.Access_token_SecretKey, function (err, decode) {
        if (err)
            throw res.status(401).send({ message: "token not valid or expire", Status_Code: 401 });
        // console.log(err,"err verify side");
        req.body.user = decode;
        next();
    });
}
exports.verify_token = verify_token;
function random_Otpfun() {
    const Otp_code = Math.floor(100000 + Math.random() * 900000);
    return Otp_code;
}
exports.random_Otpfun = random_Otpfun;
