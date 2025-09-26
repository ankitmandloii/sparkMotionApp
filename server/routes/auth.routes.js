const express = require("express");
const controllers = require("../controller/auth.controller.js");
const userValidation = require("../middleware/uservalidation/userValidation.js");
const router = express.Router();




router.post('/signup',userValidation.userRegister, controllers.signUp); //currntly use in SuperAdmin
router.post('/login',userValidation.login ,controllers.login); //currntly use in SuperAdmin and Organizer both
router.post('/admin-change-password',userValidation.verifyToken,userValidation.checkAdminPermission, controllers.adminChangePassword);






module.exports = router;
