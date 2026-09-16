import jwt from 'jsonwebtoken'

export const jsonRes = (success, msg, data) => {
    return {
        success, msg, data
    };
}

export const genJWT = (payload, secret, duration) => {
    return jwt.sign(payload, secret, {
        expiresIn: duration
    });
}

export const verifyJWT = (token, secret) => {
    return jwt.verify(token, secret);
}