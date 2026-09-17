import { Router } from "express"

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
