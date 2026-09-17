import { jsonRes } from "../utilities/helper.utilities.js"
import { SApartment } from "../model/apartment.model.js";

export const getAllApartments = async (req, res) => {
    try{
        const { location, minPrice, bedrooms, sort } = req.query;
        
        let query = {};

        if (location) {
            query.location = { $regex: location, $options: 'i' };
        }
        if (minPrice) {
            query.price_per_night = { $gte: Number(minPrice) };
        }
        if (bedrooms) {
            query.bedrooms = Number(minPrice);
        }
        
        let sortOption = { createdAt: -1 };

        if (sort === 'lowest') {
            sortOption = { price_per_night: 1 }; //Ascending
        } else if (sort === 'highest') {
            sortOption = { price_per_night: -1 }; //Descending
        }
        
        
        const apartments = await SApartment.find(query).sort(sortOption);

        const succRes = jsonRes(true, "All Apartments Gotten", apartments);
        res.status(200).json(succRes);


    } catch (e) {
        const errRes = jsonRes(false, "Error in Getting All Apartments", e.message);
        res.status(400).json(errRes);

    }
}

export const getOneApartment = async (req, res) => {
    try {

        const { id } = req.params;

        const apartment = await SApartment.findById(id);

        if(!apartment) {
            const errRes = jsonRes(false, "No Such Apartment", null);
            res.status(400).json(errRes);
            return;
        }

        
        const successRes = jsonResponse(true, "Apartment Gotten", apartment);
        res.status(200).json(successRes);

    } catch (e) {
        const errRes = jsonRes(false, "Error on Getting Apartment Details", e.message);
        res.status(400).json(errRes);
        
    }
}


