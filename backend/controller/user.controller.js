import { jsonRes } from "../utilities/helper.utilities.js"



export const getAllBookings = (req, res) => {
    try {

        

    } catch (e) {
        const errRes = jsonRes(false, "Failed to Get Bookings", e.message);
        res.status(400).json(errRes);
    }
}


export const addApartment = (req, res) => {
    try {

    } catch (e) {
        const errRes = jsonRes(false, "Failed to Add Apartment", e.message);
        res.status(400).json(errRes);
    }
}



export const updateApartment = (req, res) => {
    try {

    } catch (e) {
        const errRes = jsonRes(false, "Failed to Update Apartment", e.message);
        res.status(400).json(errRes);
    }
}
