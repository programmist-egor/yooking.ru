import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import router from "./router/auth-router.js"
import cookieParser from "cookie-parser";
import {sequelizeExtranet} from "./config/db-connect.js";
import http from "http";
import ApiError from "./exceptions/api-error.js";
import {errorMiddlewares} from "./middlewares/error-middlewares.js";
import mainRouter from "./router/main-router.js";
dotenv.config();

const corsOptions = {
    credentials: true,
    origin: process.env.REACT_APP_API_BASE_URL_YOOKING
};


const app = express();
// Обслуживание статических файлов React
// app.use('/static', express.static( 'client/public'));
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use('/', router);
app.use('/', mainRouter);
app.use('/hotels_city', mainRouter);
app.use('/hotels_map', mainRouter);
app.use('/add_object', mainRouter);
app.use('/hotel', mainRouter);
app.use('/pay', mainRouter);
app.use('/person', mainRouter);
app.use('/edit_user', mainRouter);
app.use('/booking', mainRouter);
app.use('/favorites', mainRouter);

app.use(ApiError)
app.use(errorMiddlewares)
const server = http.createServer(app);
server.timeout = 12000000;

const PORT = process.env.PORT || 5002;


// Запускаем сервер
const start = async () => {
    try {
        await sequelizeExtranet.sync();
        server.listen(PORT, () => console.log(`Сервер работает на порту ${PORT}`));
    } catch (e) {
        console.log(e);
    }
}
start()