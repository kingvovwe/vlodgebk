import { Router } from "express"

import { body } from "express-validator"

import { validateInput } from "../middleware/validator.middleware.js";
import { login, register, refreshToken } from "../controller/auth.controller.js"

const authRoute = Router();


authRoute.post(
    '/login',
    body('email').isEmail().withMessage("Please Enter a Valid Email"),
    body('password').notEmpty().isLength({ min: 6 }).withMessage("Incorrect Details"),
    validateInput,
    login
);

authRoute.post(
    '/register',
    body('name').notEmpty().withMessage("Please Enter a Name"),
    body('email').isEmail().withMessage("Please Enter a Valid Email"),
    body('password').notEmpty().isLength({ min: 6 }).withMessage("Incorrect Details"),
    validateInput,
    register
);

authRoute.post(
    '/refresh-token',
    refreshToken
);


export default authRoute;
