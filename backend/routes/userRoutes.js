// import
const router = require("express").Router();
const userController = require("../controllers/userControllers");
const otpcontroller=require ("../controllers/otpcontroller")
const Users = require("../model/userModel");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");

// create user api
router.post("/create", userController.createUser);

//  task 1: create login api
router.post("/login", userController.loginUser);

router.post("/changePassword", userController.changePassword);



router.post("/updateuser", userController.updateUserData);

router.post("/verifyOTP", otpcontroller.verifyOTP);

router.post("/forgetPassword", userController.forget);




(module.exports = router);
