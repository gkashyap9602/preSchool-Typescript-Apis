"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = require("./config/config");
const connection_1 = __importDefault(require("./connection/connection"));
const body_parser_1 = __importDefault(require("body-parser"));
const mainRoute_1 = __importDefault(require("./mainRoute"));
const middleware_1 = __importDefault(require("./utils/middleware"));
// import {RegisterRoutes} from "./routes"
const swaggerUI = __importStar(require("swagger-ui-express"));
const cors_1 = __importDefault(require("cors"));
// const corsOptions = {
// 	// origin: 'https://examination-portal.vercel.app',
// 	origin: function (origin:any, callback:any) {
// 	if (!origin) return callback(null, true);
// 	if (['http://localhost:3000', 'https://examination-portal.vercel.app'].indexOf(origin) === -1) {
// 	let msg = 'The CORS policy for this site does not allow access from the specified Origin.';
// 	return callback(new Error(msg), false);
// 	}
// 	return callback(null, true);
// 	},
// 	optionsSuccessStatus: 200
// 	};
const app = (0, express_1.default)();
app.listen(config_1.port, () => {
    console.log(`port is running on ${config_1.port}`);
});
connection_1.default.connection();
app.use(express_1.default.json());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)({
    origin: "http://localhost:3000"
}));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
const swaggerDocument = require('../swagger.json');
// console.log(swaggerDocument);
app.use('/swagger-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument), (err) => {
    if (err)
        console.log(" error swagger: ", err);
});
app.use("/api/v1", mainRoute_1.default);
app.use(middleware_1.default.err_create);
app.use(middleware_1.default.handle_err);
