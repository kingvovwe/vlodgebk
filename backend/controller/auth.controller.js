import { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET } from "../config/env.config.js";
import { SUser } from "../model/user.model.js";
import { genJWT, jsonRes, verifyJWT } from "../utilities/helper.utilities.js"
import bcrypt from "bcrypt"

export const register = async (req, res) => {
    try {

        const { name, email, password } = req.body;

        const passHash = await bcrypt.hash(password, 10); 

        const user = await SUser.create({
            name, email, password: passHash
        });

        if(!user) {
            const errRes = jsonRes(false, "Failed to Register", null);
            res.status(400).json(errRes);
            return;
        }

        const jwtPayload = {
            id: user._id,
            role: user.role
        }

        const accessToken = genJWT(jwtPayload, JWT_ACCESS_SECRET, '15m');
        const refreshToken = genJWT(jwtPayload, JWT_REFRESH_SECRET, '7d');

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: false,
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });

        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: false,
            maxAge: 15 * 60 * 1000
        });

        const succRes = jsonRes(true, `User ${name} successfully registered`, user);
        res.status(200).json(succRes);

    } catch (e) {
        const errRes = jsonRes(false, "Error in Registering User", e.message);
        res.status(400).json(errRes);

    }
}

export const login = async (req, res) => {
    try {

        const { email, password } = req.body;

        const user = await SUser.findOne({ email });

        if(!user) {
            const errRes = jsonRes(false, "Incorrect Details", null);
            res.status(400).json(errRes);
            return;
        }

        const isPasswordValid = bcrypt.compare(password, user.password);

        if(!isPasswordValid) {
            const errRes = jsonRes(false, "Incorrect Details", null);
            res.status(400).json(errRes);
            return;
        }

        const jwtPayload = {
            id: user._id,
            role: user.role
        }

        const accessToken = genJWT(jwtPayload, JWT_ACCESS_SECRET, '15m');
        const refreshToken = genJWT(jwtPayload, JWT_REFRESH_SECRET, '7d');

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: false,
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });

        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: false,
            maxAge: 15 * 60 * 1000
        });

        const succRes = jsonRes(true, `Welcome Back ${user.name}`, user);
        res.status(200).json(succRes);

    } catch (e) {
        const errRes = jsonRes(false, "Error on Login", e.message);
        res.status(400).json(errRes);
        
    }
}

export const refreshToken = async (req, res) => {
    try {

        const refreshToken = req.cookies.refreshToken;

        if(!refreshToken) {
            const errRes = jsonRes(false, "Please Login", null);
            res.status(400).json(errRes);
            return;
        }

        const isTokenValid = verifyJWT(refreshToken, JWT_REFRESH_SECRET);

        if(!refreshToken) {
            const errRes = jsonRes(false, "Invalid Token. Please Login", null);
            res.status(400).json(errRes);
            return;
        }

        const user = await SUser.findById(isTokenValid.id);

        if(!user) {
            const errRes = jsonRes(false, "No User. Please Login", null);
            res.status(400).json(errRes);
            return;
        }

        const jwtPayload = {
            id: isTokenValid.id,
            role: isTokenValid.role
        }

        const accessToken = genJWT(jwtPayload, JWT_ACCESS_SECRET, '15m');
        
        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: false,
            maxAge: 15 * 60 * 1000
        });

        
        const succRes = jsonRes(true, `Token Refreshed`, accessToken);
        res.status(200).json(succRes);

    } catch (e) {
        const errRes = jsonRes(false, "Error on Refresh Token", e.message);
        res.status(400).json(errRes);
        
    }
}

