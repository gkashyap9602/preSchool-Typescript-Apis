"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const index_1 = require("./v1/routes/index");
const router = (0, express_1.default)();
router.use("/user", index_1.userRoutes);
router.use('/admin', index_1.adminRoutes);
module.exports = router;
