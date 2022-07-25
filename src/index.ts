import express, { Request, Response } from "express";
import { port } from "./config/config";
import connect from "./connection/connection";
import bodyParser from "body-parser";
import router from "./mainRoute";
import middleware from "./utils/middleware";
// import {RegisterRoutes} from "./routes"
import * as swaggerUI from "swagger-ui-express"
import cors from "cors"

const app = express();
app.listen(port, () => {
	console.log(`port is running on ${port}`);
});

connect.connection()
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({origin:'*'}));

const swaggerDocument = require('../swagger.json')
// console.log(swaggerDocument);
app.use('/swagger-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument), (err: any) => {
	if (err) console.log(" error swagger: ", err)

})

app.use("/api/v1", router);

app.use(middleware.err_create)
app.use(middleware.handle_err)
