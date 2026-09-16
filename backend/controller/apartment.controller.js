import { jsonRes } from "../utilities/helper.utilities.js"
import { SApartment } from "../model/apartment.model.js";

export const getAllApartments = async (req, res) => {
    try{

        const apartments = await SApartment.

    } catch (e) {
        const errRes = jsonRes(false, "Error in Registering User", e.message);
        res.status(400).json(errRes);

    }
}

export const getOneApartment = async (req, res) => {
    try {

        const { id } = req.params;

    } catch (e) {
        const errRes = jsonRes(false, "Error on Login", e.message);
        res.status(400).json(errRes);
        
    }
}


