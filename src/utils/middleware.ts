import { Request, Response, NextFunction } from "express";
import {error_Object} from "./helperFun";
import { classType } from "./helperFun";
import http from "http-status-codes"

function err_create(req: Request, res: Response, next: NextFunction) {
  const err = new Error("route not found");
  const resp = new error_Object(err.message,http.NOT_FOUND)
  console.log(err.message, "create side");
  next(resp);
}

function handle_err(err: any, req: Request, res: Response, next: NextFunction) {
  console.log(err.stack, "handle side");
  console.log(err, 'errrr');

  if(err.name === "MongoServerError" || err.code === 11000){
  res.json({
      message: "Duplicate Value or User Details Already exists",
      error: err.keyValue,
      status_code:err.Status_Code || http.UNPROCESSABLE_ENTITY,
      stack:err.stack
  })

  }else{
  res.json({
      message:err.message ? err.message : err,
      status_code:err.Status_Code || http.BAD_REQUEST,
      stack:err.stack
  })
  }


}

export default {
  err_create,
  handle_err,
};
