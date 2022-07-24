"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mailer = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
function mailer(email, subject, text) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const transport = nodemailer_1.default.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                secure: false,
                //require Tls true
                auth: {
                    user: "iamgaurav0786@gmail.com",
                    pass: "mrzhxcrhjokkstwe",
                },
            });
            var mailOptions = {
                from: "iamgaurav0786@gmail.com",
                to: email,
                subject: subject,
                text: text
            };
            var mail_response = yield transport.sendMail(mailOptions);
            // console.log(mail_response, "mailerr side");
            if (mail_response) {
                return mail_response;
            }
        }
        catch (error) {
            console.log("error:", error.message);
            return { mailError: error };
        }
    });
}
exports.mailer = mailer;
