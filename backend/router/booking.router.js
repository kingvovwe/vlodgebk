import { Router } from "express"
import { body } from "express-validator"

import { validateInput } from "../middleware/validator.middleware.js";
import { bookApartment, verifyBookedApartment } from "../controller/booking.controller";


const bookingRoute = Router();


bookingRoute.post(
    '/:id',
    bookApartment
);

bookingRoute.get(
    '/verify',
    body('email').isEmail().withMessage("Invalid Email"),
    body('id').notEmpty().withMessage("Enter Booking ID"),
    validateInput,
    verifyBookedApartment
);



export default bookingRoute;
