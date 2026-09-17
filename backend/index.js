import express from "express"
import cookieParser from "cookie-parser"

import { connDB } from "./config/db.config.js";
import { PORT, API_PREFIX } from "./config/env.config.js";
import { logger } from "./middleware/basic.middleware.js";

import authRoute from "./router/auth.route.js";
import apartmentRoute from "./router/apartment.router.js";

const app = express();

app.use(express.json());
app.use(logger);
app.use(cookieParser());

app.use(`${API_PREFIX}/auth`, authRoute);
app.use(`${API_PREFIX}/apartment`, apartmentRoute);


(async () => {

    try {

        await connDB();

        app.listen(PORT, () => {
            console.log(`App started on PORT: ${PORT}`);
        })

    } catch (e) {
        console.log("Failed to start app: ", e.message);
        process.exit(1);
    }

})()
