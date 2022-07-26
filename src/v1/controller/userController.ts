// import mongoose from "mongoose"
import express, { Response, Request, NextFunction } from "express";
import {UserModels} from "../../models/index";
import { userInterface } from "../../models/userModel/ModelUser";
import {error_Object,resp_Object,response_handler,object_id_check} from "../../utils/helperFun";
import {MESSAGES}  from "../../utils/message";
import http from "http-status-codes"
import bcrypt from 'bcrypt'
// console.log(http,"http");

export default {
  hello_world,
  New_users,
};


// register new user and give him/her a unique username 
async function New_users(req: Request, res: Response, next: NextFunction) {
  try {
    const salt = await bcrypt.genSalt(10);
    const body = req.body;
    //  logic part of autogenerated username
    const today = new Date();
    const year = today.getFullYear().toString();
    const yearcode = parseInt(year.slice(-2));
    const usercount = await UserModels.ModelUser.find({ role: 3 }).count();
    const count:any = (usercount + 1).toString();
    const usercode = count.padStart(2, 0);
    // check if user alreday exist or not 
    const finduser = await UserModels.ModelUser.findOne({ email: body.email });
    console.log(finduser);
    if (finduser) throw new error_Object(MESSAGES.USER_ALREADY_REGISTERED,http.UNPROCESSABLE_ENTITY)
    body.password = await bcrypt.hash(body.password, salt);
    // // const student_img = req.file.path;
    // // Student_Data.student_img = student_img;

    // assigning a auto generated username to the user
    Object.assign(body, { username: "PS" + yearcode + usercode });

    const UserSaved = await new UserModels.ModelUser<userInterface>(body).save();
    const response = new resp_Object(MESSAGES.USER_REGISTERED_SUCCESSFULLY, http.CREATED, UserSaved);

    res.send(response);
  } catch (error) {
    // console.log("catch side", error);
    next(error);
  }
}


async function hello_world(req: Request, res: Response) {
  try {
    res.send("hello user");
  } catch (error) {
    res.send(error);
  }
}
