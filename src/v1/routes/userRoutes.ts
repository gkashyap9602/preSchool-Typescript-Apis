import express, { Request, Response } from "express";
const router = express.Router();

import Controller from "../controller/index";

router.get("/hello", Controller.userController.hello_world);
router.post('/create',Controller.userController.New_users)

export = router;
