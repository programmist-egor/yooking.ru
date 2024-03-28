import nodeMailer from "nodemailer"
import dotenv from "dotenv";
dotenv.config()

class MailService {
    constructor() {
        this.transporter = nodeMailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD
            }
        })
    }

    async sendActivationMail(to, link) {
        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject: "Активация аккаунта на " + process.env.API_SERVER,
            text: "",
            html:
                `
            <div>
                <h1>Для активации перейдите по ссылке</h1>
                <a href="${link}">${link}</a>
            </div>
            `
        })
    }
    async sendConfirmPhoneCodeMail(to, code) {
        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject: "Код подтверждения " + process.env.API_SERVER,
            text: "",
            html:
                `
            <div>
                <h1>Код для подтверждения</h1>
                <span style={{color: "red", fontSize: 20, fontWeight: "bold"}}>{code}</span>
            </div>
            `
        })
    }
}

export default new MailService()