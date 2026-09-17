import { validationResult } from 'express-validator'

import { jsonRes, verifyJWT } from '../utilities/helper.utilities.js'
import { JWT_ACCESS_SECRET } from '../config/env.config.js';
import { SUser } from '../model/user.model.js';

export const validateInput = (req, res, next) => {
    const errs = validationResult(req);

    if(!errs.isEmpty()) {
        const errRes = jsonRes(false, "Validation Error", errs.array());
        res.status(400).json(errRes);
        return;
    }

    next();
};


export const isLoggedIn = async (req, res, next) => {
    try{

        const accessToken = req.cookies.accessToken;

        if(!accessToken) {
            const errRes = jsonRes(false, "Please Login", null);
            res.status(400).json(errRes);
            return;
        }

        const isTokenValid = verifyJWT(accessToken, JWT_ACCESS_SECRET);

        if(!isTokenValid) {
            const errRes = jsonRes(false, "Invalid Token: Please Login", null);
            res.status(400).json(errRes);
            return;
        }

        const user = await SUser.findById(isTokenValid.id);

        if(!user) {
            const errRes = jsonRes(false, "No Such User: Please Register", null);
            res.status(400).json(errRes);
            return;
        }

        req.user = user;

        next();
        
    } catch (e) {
        const errRes = jsonRes(false, "Failed To Verify User: Please Login", e.message);
        res.status(400).json(errRes);

    }
}

