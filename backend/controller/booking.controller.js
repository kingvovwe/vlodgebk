import { jsonRes } from "../utilities/helper.utilities.js"
import { SApartment } from "../model/apartment.model.js";
import { SBooking } from "../model/booking.model.js";

export const bookApartment = async (req, res) => {
    try{
        
    } catch (e) {
        const errRes = jsonRes(false, "Error in Getting All Apartments", e.message);
        res.status(400).json(errRes);

    }
}

export const verifyBookedApartment = async (req, res) => {
    try {

        const { email, id } = req.body;

        const booking = await SBooking.findOne({ _id: id, guest_email: email });
        
        if(!booking) {
            const errRes = jsonRes(false, "No Such Booking", null);
            res.status(400).json(errRes);
            return;
        }

        const successRes = jsonRes(true, "Booking Found", booking);
        res.status(200).json(successRes);
        
    } catch (e) {
        const errRes = jsonRes(false, "Error on Getting Apartment Details", e.message);
        res.status(400).json(errRes);
        
    }
}


