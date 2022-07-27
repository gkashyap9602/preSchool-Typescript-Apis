"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const multer_1 = __importDefault(require("multer"));
const UserUpload = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        if (file.fieldname === 'image') {
            cb(null, "./views/uploads/images");
        }
        else if (file.fieldname === 'Profile_img') {
            cb(null, "./views/uploads/profilepics");
        }
        else {
            cb(null, "./views/uploads");
        }
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path_1.default.extname(file.originalname));
        //console.log(storage.filename);
    },
});
const AdminUpload = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./views/uploads/studentpics");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path_1.default.extname(file.originalname));
    },
});
const multerUser = (0, multer_1.default)({ storage: UserUpload });
const multerAdmin = (0, multer_1.default)({ storage: AdminUpload });
exports.default = { multerUser, multerAdmin };
