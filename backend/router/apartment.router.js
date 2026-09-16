import { Router } from "express"

import { body } from "express-validator"

import { validateInput } from "../middleware/validator.middleware.js";
import { login, register, refreshToken } from "../controller/auth.controller.js"
import { getAllApartments, getOneApartment } from "../controller/apartment.controller.js";

const apartmentRoute = Router();


apartmentRoute.get(
    '/',
    getAllApartments
);

apartmentRoute.get(
    '/:id',
    getOneApartment
);



export default apartmentRoute;
