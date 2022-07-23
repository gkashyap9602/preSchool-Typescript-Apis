"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const index_1 = __importDefault(require("../controller/index"));
router.get("/hello", index_1.default.userController.hello_world);
router.post('/create', index_1.default.userController.New_users);
module.exports = router;
