"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
exports.AdminController = void 0;
const index_1 = require("../../models/index");
const message_1 = require("../../utils/message");
const bcrypt_1 = __importDefault(require("bcrypt"));
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const index_2 = __importDefault(require("../../services/index"));
const auth_1 = require("../../utils/auth");
const helperFun_1 = require("../../utils/helperFun");
const tsoa_1 = require("tsoa");
const ModelNewStudent_1 = require("../../models/adminModel/ModelNewStudent");
let refreshTokens = [];
let AdminController = class AdminController extends tsoa_1.Controller {
    constructor(req, res) {
        super();
        this.req = req;
        this.res = res;
        this.userId = req.body.user ? req.body.user._id : "";
        this.userRole = req.body.user ? req.body.user.role : null;
    }
    ;
    New_Users(request) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const salt = yield bcrypt_1.default.genSalt(10);
                const body = request;
                //  logic part of autogenerated username
                const today = new Date();
                const year = today.getFullYear().toString();
                const yearcode = parseInt(year.slice(-2));
                const usercount = yield index_1.AdminModels.ModelNewUser.find({
                    role: 3,
                }).count();
                const count = (usercount + 1).toString();
                const usercode = count.padStart(2, 0);
                // check if user alreday exist or not
                const finduser = yield index_1.AdminModels.ModelNewUser.findOne({
                    email: body.email,
                });
                console.log(finduser);
                if (finduser)
                    throw new helperFun_1.error_Object(message_1.MESSAGES.USER_ALREADY_REGISTERED, http_status_codes_1.default.UNPROCESSABLE_ENTITY);
                body.password = yield bcrypt_1.default.hash(body.password, salt);
                // // const student_img = req.file.path;
                // // Student_Data.student_img = student_img;
                // assigning a auto generated username to the user
                Object.assign(body, { username: "PS" + yearcode + usercode });
                const UserSaved = yield new index_1.AdminModels.ModelNewUser(body).save((err, success) => __awaiter(this, void 0, void 0, function* () {
                    if (err)
                        throw err;
                    const mail = yield index_2.default.mailer(body.email, "Successfull Registration", `Hello ${success.fname + " " + success.lname} You are Registered Successfully`);
                    // console.log(mail,"maill controller side");
                    // if(mail.mailError) throw mail.mailError
                }));
                return new helperFun_1.resp_Object(message_1.MESSAGES.USER_REGISTERED_SUCCESSFULLY, http_status_codes_1.default.CREATED, UserSaved);
            }
            catch (error) {
                return { CatchError: error };
            }
        });
    }
    ;
    AdminLoginFun(request) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(request, "request");
                const { email, password } = request;
                console.log(email, password, "email passs");
                // find if user exist or not
                const Userdata = yield index_1.AdminModels.ModelNewUser.findOne({ email: email });
                if (!Userdata)
                    throw new helperFun_1.error_Object(message_1.MESSAGES.USER_NOT_VALID, http_status_codes_1.default.UNAUTHORIZED);
                const user_id = Userdata._id;
                if (yield bcrypt_1.default.compare(password, Userdata.password)) {
                    if (Userdata.role === 1) {
                        //generating jwt token
                        const token = (0, auth_1.genAuthToken)(user_id);
                        if (!token)
                            throw new helperFun_1.error_Object(message_1.MESSAGES.TOKEN_NOT_GENERATED, http_status_codes_1.default.NOT_FOUND);
                        //   console.log(token, "token login side");
                        refreshTokens.push(token.refresh_token);
                        return new helperFun_1.resp_Object(message_1.MESSAGES.LOGIN_SUCCESSFULLY, http_status_codes_1.default.ACCEPTED, {
                            AccessToken: token.Access_token,
                            RefreshToken: token.refresh_token,
                        });
                    }
                    else {
                        throw new helperFun_1.error_Object(message_1.MESSAGES.YOU_ARE_NOT_ADMIN, http_status_codes_1.default.UNAUTHORIZED);
                    }
                }
                else {
                    throw new helperFun_1.error_Object(message_1.MESSAGES.PASSWORD_NOT_MATCHED, http_status_codes_1.default.UNAUTHORIZED);
                }
            }
            catch (error) {
                return { CatchError: error };
            }
        });
    }
    ;
    Update_userfun(request, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user_id = id;
                console.log(user_id, "idd");
                const body = request;
                console.log(body, "body or request");
                if (!body)
                    throw new helperFun_1.error_Object("Something Not Right Data Not Recieved Please Enter Data", http_status_codes_1.default.EXPECTATION_FAILED);
                const find = yield index_1.AdminModels.ModelNewUser.findOne({ _id: user_id });
                if (!find)
                    throw new helperFun_1.error_Object(message_1.MESSAGES.DOES_NOT_EXIST, http_status_codes_1.default.EXPECTATION_FAILED);
                const UserUpdated = yield index_1.AdminModels.ModelNewUser.findByIdAndUpdate(user_id, body, { new: true });
                return new helperFun_1.resp_Object(message_1.MESSAGES.UPDATED_SUCCESSFULLY, http_status_codes_1.default.CREATED);
            }
            catch (error) {
                return { CatchError: error };
            }
        });
    }
    Delete_Userfun(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user_id = id;
                console.log(user_id);
                const find = yield index_1.AdminModels.ModelNewUser.findOne({ _id: user_id });
                if (!find)
                    throw new helperFun_1.error_Object(message_1.MESSAGES.DOES_NOT_EXIST, http_status_codes_1.default.EXPECTATION_FAILED);
                const deleted = yield index_1.AdminModels.ModelNewUser.findByIdAndDelete(user_id);
                console.log(deleted, "deleted");
                return new helperFun_1.resp_Object(message_1.MESSAGES.DELETED_SUCCESSFULLY, http_status_codes_1.default.ACCEPTED);
            }
            catch (error) {
                return { CatchError: error };
            }
        });
    }
    ;
    User_detailsfun() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(this.userId, "userid token ");
                const users_details = yield index_1.AdminModels.ModelNewUser.find({ role: 3 }, "father_name mobileNum fname gender");
                return new helperFun_1.resp_Object(message_1.MESSAGES.DATA_RETREIVE_SUCCESSFULLY, http_status_codes_1.default.OK, users_details);
            }
            catch (error) {
                return { CatchError: error };
            }
        });
    }
    ;
    // @Security("Bearer")
    // @Get("/users/{id}")
    // public async SingleUserDetail(@Path() paramsId:string) {
    //  try {
    //   const user_id = paramsId
    //   const userdata = await AdminModels.ModelNewUser.find(
    //     { _id: user_id },
    //     { password: 0 }
    //   );
    //   const response = new resp_Object(
    //     MESSAGES.DATA_RETREIVE_SUCCESSFULLY,
    //     http.OK,
    //     userdata
    //   );
    //   return { CatchResponse: response };
    // } catch (error) {
    //   return { CatchError: error };
    // }
    // };
    //--------------class functions-------------------------------
    addCourse(request) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let Class_Data = request;
                if (!Class_Data)
                    throw new helperFun_1.error_Object("please enter data", 404);
                const FindClass = yield index_1.AdminModels.ModelNewCource.findOne({ Class: Class_Data.Class });
                if (FindClass)
                    throw new helperFun_1.error_Object(message_1.MESSAGES.CLASS_ALREADY_REGISTERED, http_status_codes_1.default.CONFLICT);
                const ClassRegistered = yield new index_1.AdminModels.ModelNewCource(Class_Data).save();
                return new helperFun_1.resp_Object(message_1.MESSAGES.CLASS_REGISTERED_SUCCESSFULLY, http_status_codes_1.default.CREATED);
            }
            catch (error) {
                return { CatchError: error };
            }
        });
    }
    ;
    updateClass(request, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updates = request;
                const options = { new: true };
                const result = yield index_1.AdminModels.ModelNewCource.findByIdAndUpdate(id, updates, options);
                if (!result)
                    throw new helperFun_1.error_Object(message_1.MESSAGES.DOES_NOT_EXIST, http_status_codes_1.default.NOT_FOUND);
                return new helperFun_1.resp_Object(message_1.MESSAGES.CLASS_UPDATED_SUCCESSFULLY, http_status_codes_1.default.NO_CONTENT, result);
            }
            catch (error) {
                return { CatchError: error };
            }
        });
    }
    ;
    deleteClass(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield index_1.AdminModels.ModelNewCource.deleteOne({ _id: id });
                console.log(data, "data..");
                if (!data)
                    throw new helperFun_1.error_Object(message_1.MESSAGES.DOES_NOT_EXIST, http_status_codes_1.default.BAD_REQUEST);
                return new helperFun_1.resp_Object(message_1.MESSAGES.DELETED_SUCCESSFULLY, http_status_codes_1.default.NO_CONTENT);
            }
            catch (error) {
                return { CatchError: error };
            }
        });
    }
    ;
    get_classes() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const get_classes = yield index_1.AdminModels.ModelNewCource.find({}, { addmission_fee: 0, monthly_fee: 0 });
                return new helperFun_1.resp_Object(message_1.MESSAGES.DATA_RETREIVE_SUCCESSFULLY, http_status_codes_1.default.OK, get_classes);
            }
            catch (error) {
                return { CatchError: error };
            }
        });
    }
    ;
    //---------------------------student functions ------------------------------//
    Add_Student(request) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const body = request;
                console.log(body.userId, "userid", body.classId, "classID");
                const FindClass = yield index_1.AdminModels.ModelNewCource.findById({ _id: body.classId });
                //  console.log(className);
                if (!FindClass)
                    throw new helperFun_1.error_Object(message_1.MESSAGES.INVALID_ID_OR_DATA_DOES_NOT_EXIST, http_status_codes_1.default.NOT_FOUND);
                const ClassName = FindClass.Class;
                const finduser = yield index_1.AdminModels.ModelNewStudent.find({
                    userId: body.userId,
                    classId: body.classId
                });
                console.log(finduser.length, "lenght");
                console.log(finduser, "finduserrrrr");
                // console.log(finduser, "find user");
                if (finduser.length == 0) {
                    const ClassCount = yield index_1.AdminModels.ModelNewStudent.find({
                        class_id: body.classId,
                    }).count();
                    // console.log(countt,"same class count");
                    Object.assign(body, { roll_num: ClassName * 1000 + 1 + ClassCount });
                    const Store_Student = yield new index_1.AdminModels.ModelNewStudent(body).save();
                    return new helperFun_1.resp_Object(message_1.MESSAGES.STUDENT_REGISTERED_SUCCESSFULLY, http_status_codes_1.default.CREATED, Store_Student);
                }
                else {
                    console.log("already");
                    throw new helperFun_1.error_Object(message_1.MESSAGES.STUDENT_ALREADY_REGISTERED_WITH_SAME_CLASS, http_status_codes_1.default.CONFLICT);
                }
            }
            catch (error) {
                return { CatchError: error };
            }
        });
    }
    ;
    updateStudent(request, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updates = request;
                const result = yield index_1.AdminModels.ModelNewStudent.findByIdAndUpdate(id, updates, { new: true });
                if (!result)
                    throw new helperFun_1.error_Object(message_1.MESSAGES.INVALID_ID_OR_DATA_DOES_NOT_EXIST, http_status_codes_1.default.NOT_FOUND);
                return new helperFun_1.resp_Object(message_1.MESSAGES.STUDENT_UPDATED_SUCCESSFULLY, http_status_codes_1.default.NO_CONTENT, result);
            }
            catch (error) {
                return { CatchError: error };
            }
        });
    }
    ;
    deleteStudent(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const UserDeleted = yield index_1.AdminModels.ModelNewStudent.findByIdAndUpdate(id, { IsActive: false }, { new: true });
                // const data = await AdminModels.ModelNewStudent.deleteOne({ _id: id });
                if (!UserDeleted)
                    throw new helperFun_1.error_Object(message_1.MESSAGES.INVALID_ID_OR_DATA_DOES_NOT_EXIST, http_status_codes_1.default.NOT_FOUND);
                return new helperFun_1.resp_Object(message_1.MESSAGES.STUDENT_DELETED_SUCCESSFULLY, http_status_codes_1.default.NO_CONTENT);
            }
            catch (error) {
                return { CatchError: error };
            }
        });
    }
    ;
    //   @Security('Bearer')
    get_Students(page, size) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //   let { page, size } 
                //   if (!page) {
                // 	page = 1;
                //   }
                //   if (!size) {
                // 	size = 2;
                //   }
                //   const limit = parseInt(size);
                //   const skip = (page - 1) * size;
                //   const fetchdata = await AdminModels.ModelNewStudent.find({ IsActive:true })
                //   IsActive:Boolean
                const mydata = yield ModelNewStudent_1.ModelNewStudent.aggregate([
                    {
                        $match: {
                            IsActive: 'true'
                        }
                    }, {
                        $lookup: {
                            from: 'new_users',
                            localField: 'userId',
                            foreignField: '_id',
                            as: "ss"
                        }
                    }, {
                        $project: {
                            fname: "$ss.fname",
                            _id: 0
                        }
                    }
                ]).exec();
                //   const newdata = await AdminModels.ModelNewUser.aggregate([
                // 	{
                // 		$match:{
                // 			email:'vickyhasija@gmail.com'
                // 		}
                // 	}
                //   ])
                console.log(mydata, "ghjh");
                // .limit(limit)
                // .skip(skip)
                // .sort({ updatedAt: -1 });
                //   return new resp_Object("Student Data", 200, fetchdata);
                return new helperFun_1.resp_Object("Student Data", 200, mydata);
            }
            catch (error) {
                console.log("catch me hoo");
                return { errors: error };
            }
        });
    }
    //--------------------refresh token-----------------------------
    renew_token(request) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { refresh_token } = request;
                if (!refresh_token)
                    throw new helperFun_1.error_Object("please enter data", 404);
                console.log(refresh_token, "controller side");
                if (refresh_token || refreshTokens.includes(refresh_token)) {
                    const verify = yield (0, auth_1.verify_refresh_token)(refresh_token);
                    // const verify: any =  jwt.verify(refresh_token, refresh_token_SecretKey)
                    if (verify.verify_err) {
                        console.log(verify.verify_err, "verify_err sideeeeeeeeeeee");
                        throw verify.verify_err;
                    }
                    // new error_Object("invalid token please check", 422)
                    console.log(verify, "verifyyyy");
                    const New_Access_token = (0, auth_1.genAuthToken)(verify._id);
                    if (New_Access_token) {
                        return new helperFun_1.resp_Object(message_1.MESSAGES.TOKEN_GENERATED_SUCCESSFULLY, http_status_codes_1.default.CREATED, { NewAccesstoken: New_Access_token.Access_token });
                    }
                }
            }
            catch (error) {
                console.log(error, "catch side err");
                return { CatchError: error };
            }
        });
    }
    ;
};
__decorate([
    (0, tsoa_1.Post)("/user/create"),
    __param(0, (0, tsoa_1.Body)())
], AdminController.prototype, "New_Users", null);
__decorate([
    (0, tsoa_1.Post)("/login"),
    __param(0, (0, tsoa_1.Body)())
], AdminController.prototype, "AdminLoginFun", null);
__decorate([
    (0, tsoa_1.Security)("Bearer"),
    (0, tsoa_1.Put)("/user/update/:id"),
    __param(0, (0, tsoa_1.Body)())
], AdminController.prototype, "Update_userfun", null);
__decorate([
    (0, tsoa_1.Security)("Bearer"),
    (0, tsoa_1.Delete)("/user/delete/:id")
], AdminController.prototype, "Delete_Userfun", null);
__decorate([
    (0, tsoa_1.Security)("Bearer"),
    (0, tsoa_1.Get)("/users")
], AdminController.prototype, "User_detailsfun", null);
__decorate([
    (0, tsoa_1.Security)("Bearer"),
    (0, tsoa_1.Post)("/class/create"),
    __param(0, (0, tsoa_1.Body)())
], AdminController.prototype, "addCourse", null);
__decorate([
    (0, tsoa_1.Security)("Bearer"),
    (0, tsoa_1.Put)("class/update/:id"),
    __param(0, (0, tsoa_1.Body)())
], AdminController.prototype, "updateClass", null);
__decorate([
    (0, tsoa_1.Security)('Bearer'),
    (0, tsoa_1.Delete)('/class/delete/:id')
], AdminController.prototype, "deleteClass", null);
__decorate([
    (0, tsoa_1.Security)('Bearer'),
    (0, tsoa_1.Get)('/classes')
], AdminController.prototype, "get_classes", null);
__decorate([
    (0, tsoa_1.Security)('Bearer'),
    (0, tsoa_1.Post)('/student/create'),
    __param(0, (0, tsoa_1.Body)())
], AdminController.prototype, "Add_Student", null);
__decorate([
    (0, tsoa_1.Security)('Bearer'),
    (0, tsoa_1.Put)('/student/update/:id'),
    __param(0, (0, tsoa_1.Body)())
], AdminController.prototype, "updateStudent", null);
__decorate([
    (0, tsoa_1.Security)('Bearer'),
    (0, tsoa_1.Delete)('/student/delete/:id')
], AdminController.prototype, "deleteStudent", null);
__decorate([
    (0, tsoa_1.Get)('/students'),
    __param(0, (0, tsoa_1.Query)()),
    __param(1, (0, tsoa_1.Query)())
], AdminController.prototype, "get_Students", null);
__decorate([
    (0, tsoa_1.Security)('Bearer'),
    (0, tsoa_1.Post)('/login/refreshtoken'),
    __param(0, (0, tsoa_1.Body)())
], AdminController.prototype, "renew_token", null);
AdminController = __decorate([
    (0, tsoa_1.Tags)("Admin"),
    (0, tsoa_1.Route)("/admin")
], AdminController);
exports.AdminController = AdminController;
;
