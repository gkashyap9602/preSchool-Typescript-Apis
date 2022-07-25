import express, { Request, Response ,NextFunction} from "express";
import { port } from "./config/config";
import connect from "./connection/connection";
import bodyParser from "body-parser";
import router from "./mainRoute";
import middleware from "./utils/middleware";
// import {RegisterRoutes} from "./routes"
import * as swaggerUI from "swagger-ui-express"
import cors from "cors"

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

const app = express();
app.listen(port, () => {
	console.log(`port is running on ${port}`);
});

connect.connection()
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(
	{
		origin:"http://localhost:3000"
	}
));

app.use(function(req:Request, res:Response, next:NextFunction) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST');
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
 });

const swaggerDocument = require('../swagger.json')
// console.log(swaggerDocument);
app.use('/swagger-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument), (err: any) => {
	if (err) console.log(" error swagger: ", err)

})

app.use("/api/v1", router);

app.use(middleware.err_create)
app.use(middleware.handle_err)
