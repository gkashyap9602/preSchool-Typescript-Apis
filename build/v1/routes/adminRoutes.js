"use strict";
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
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const adminController_1 = require("../controller/adminController");
const auth_1 = require("../../utils/auth");
const helperFun_1 = require("../../utils/helperFun");
router.post('/user/create', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const controller = new adminController_1.AdminController(req, res);
    if (!req.body) {
        res.status(400).send({ message: "body is emptyy", status_code: 400 });
    }
    const response = yield controller.New_Users(req.body);
    console.log(response, "response");
    response.CatchError ? next(response.CatchError) : (0, helperFun_1.response_handler)(response, res);
}));
router.put('/user/update/:id', auth_1.verify_token, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const controller = new adminController_1.AdminController(req, res);
    (0, helperFun_1.object_id_check)(req.params.id, res);
    const response = yield controller.Update_userfun(req.body, req.params.id);
    console.log(response, "response");
    response.CatchError ? next(response.CatchError) : (0, helperFun_1.response_handler)(response, res);
}));
router.delete('/user/delete/:id', auth_1.verify_token, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const controller = new adminController_1.AdminController(req, res);
    (0, helperFun_1.object_id_check)(req.params.id, res);
    const response = yield controller.Delete_Userfun(req.params.id);
    console.log(response, "response");
    response.CatchError ? next(response.CatchError) : (0, helperFun_1.response_handler)(response, res);
}));
router.get('/users', auth_1.verify_token, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const controller = new adminController_1.AdminController(req, res);
    const response = yield controller.User_detailsfun();
    console.log(response, "response");
    response.CatchError ? next(response.CatchError) : (0, helperFun_1.response_handler)(response, res);
}));
router.post('/login', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const controller = new adminController_1.AdminController(req, res);
    console.log(req.body, "admin route side");
    const response = yield controller.AdminLoginFun(req.body);
    response.CatchError ? next(response.CatchError) : (0, helperFun_1.response_handler)(response, res);
}));
//  router.get('/users/:id',async(req: Request, res: Response, next: NextFunction)=>{
//     const controller = new AdminController(req,res)
//     console.log(req.params.id,"admin route side");
//     const response = await controller.SingleUserDetail(req.params.id)
//     response.CatchResponse? response_handler( response.CatchResponse,res): next(response.CatchError)
//     });
//--------------------------class routes------------------------------
router.post('/class/create', auth_1.verify_token, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const controller = new adminController_1.AdminController(req, res);
    console.log(req.body, "admin route side");
    const response = yield controller.addCourse(req.body);
    response.CatchError ? next(response.CatchError) : (0, helperFun_1.response_handler)(response, res);
}));
router.put('/class/update/:id', auth_1.verify_token, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const controller = new adminController_1.AdminController(req, res);
    (0, helperFun_1.object_id_check)(req.params.id, res);
    console.log(req.body, req.params.id, "admin route side");
    const response = yield controller.updateClass(req.body, req.params.id);
    response.CatchError ? next(response.CatchError) : (0, helperFun_1.response_handler)(response, res);
}));
router.delete('/class/delete/:id', auth_1.verify_token, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const controller = new adminController_1.AdminController(req, res);
    (0, helperFun_1.object_id_check)(req.params.id, res);
    console.log(req.params.id, "admin route side");
    const response = yield controller.deleteClass(req.params.id);
    response.CatchError ? next(response.CatchError) : (0, helperFun_1.response_handler)(response, res);
}));
router.get('/classes', auth_1.verify_token, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const controller = new adminController_1.AdminController(req, res);
    const response = yield controller.get_classes();
    response.CatchError ? next(response.CatchError) : (0, helperFun_1.response_handler)(response, res);
}));
//-------------------student routes-----------------------------
router.post('/student/create', auth_1.verify_token, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const controller = new adminController_1.AdminController(req, res);
    const response = yield controller.Add_Student(req.body);
    response.CatchError ? next(response.CatchError) : (0, helperFun_1.response_handler)(response, res);
}));
router.put('/student/update/:id', auth_1.verify_token, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const controller = new adminController_1.AdminController(req, res);
    (0, helperFun_1.object_id_check)(req.params.id, res);
    const response = yield controller.updateStudent(req.body, req.params.id);
    response.CatchError ? next(response.CatchError) : (0, helperFun_1.response_handler)(response, res);
}));
router.delete('/student/delete/:id', auth_1.verify_token, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const controller = new adminController_1.AdminController(req, res);
    (0, helperFun_1.object_id_check)(req.params.id, res);
    console.log(req.params.id, "admin route side");
    const response = yield controller.deleteStudent(req.params.id);
    response.CatchError ? next(response.CatchError) : (0, helperFun_1.response_handler)(response, res);
}));
router.get('/students', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const controller = new adminController_1.AdminController(req, res);
    const { page, size } = req.query;
    const response = yield controller.get_Students(page, size);
    response.CatchError ? next(response.CatchError) : (0, helperFun_1.response_handler)(response, res);
}));
router.post('/login/refreshtoken', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const controller = new adminController_1.AdminController(req, res);
    console.log(req.body, "admin route side");
    const response = yield controller.renew_token(req.body);
    response.CatchError ? next(response.CatchError) : (0, helperFun_1.response_handler)(response, res);
}));
module.exports = router;
