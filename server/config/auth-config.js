import dotenv from "dotenv";
dotenv.config()

const secret = {
    ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
    REFRESH_SECRET: process.env.JWT_REFRESH_SECRET
}
export default secret