import { validationResult } from 'express-validator'

import { jsonRes } from '../utilities/helper.utilities.js'

export const validateInput = (req, res, next) => {
    const errs = validationResult(req);

    if(!errs.isEmpty()) {
        const errRes = jsonRes(false, "Validation Error", errs.array());
        res.status(400).json(errRes);
        return;
    }

    next();
}

