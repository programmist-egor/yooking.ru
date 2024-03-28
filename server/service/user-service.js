import {v4 as uuidv4} from 'uuid';
import MailService from "./mail-service.js";
import SimpleCrypt  from "simplecrypt"
import TokenService from "./token-service.js";
import ApiError from "../exceptions/api-error.js";
import UserDtos from "../dtos/user-dtos.js";
import dotenv from "dotenv";
import UsersYooking from "../models/users-yooking-model.js";
const sc = new SimpleCrypt();

dotenv.config()

class UserService {
    async registration(newUser) {
        try {
            const { email, phone, password } = newUser;

            const candidate = await UsersYooking.findOne({ where: { email } });
            console.log("candidate", candidate);
            if (candidate) {
                throw new Error(`Пользователь с почтовым адресом ${email} уже существует`);
            }

            const phoneUser = await UsersYooking.findOne({ where: { phone } });
            console.log("phoneUser", phoneUser);
            if (phoneUser) {
                throw new Error(`Пользователь с таким номером ${phone} уже существует`);
            }

            const hashPassword = sc.encrypt(password);
            const activationLink = uuidv4();
            const dataUser = {
                ...newUser,
                email,
                password: hashPassword,
                phone,
                activationLink
            };

            const user = await UsersYooking.create(dataUser);
            const userSaveToDtos = {
                id: user.id,
                email: user.email,
                phone: user.phone,
                isActivated: user.isActivated,
            };

            // Отправка письма активации

            const userDto = new UserDtos(userSaveToDtos);
            const tokens = TokenService.generateTokens({ ...userDto });

            try {
                await TokenService.saveToken(userDto.id, tokens.refreshToken);
            } catch (tokenError) {
                throw new Error(`Ошибка сохранения токена: ${tokenError.message}`);
            }

            return { ...tokens, user: userDto };
        } catch (error) {
            console.error("Ошибка регистрации пользователя:", error);
            throw new Error("Ошибка регистрации пользователя");
        }
    }

    async login(email, password) {
        const user = await UsersYooking.findOne({ where: { email } });
        console.log("user", user);
        if (!user) {
            throw new ApiError.BadRequest("Пользователь с таким email не найден");
        }

        const isPasswordValid = sc.decrypt(user.password) === password;
        console.log("isPasswordValid", isPasswordValid);
        if (!isPasswordValid) {
            throw new ApiError.BadRequest("Неверный пароль");
        }

        const userSaveToDtos = {
            id: user.id,
            email: user.email,
            phone: user.phone,
            isActivated: user.isActivated,
        };
        const userDto = new UserDtos(userSaveToDtos);
        const tokens = TokenService.generateTokens({ ...userDto });
        await TokenService.saveToken(userDto.id, tokens.refreshToken);

        return { ...tokens, user: userDto };
    }

    async activate(activationLink) {
        const user = await UsersYooking.findOne({where: {activationLink}});
        if (!user) {
            throw new ApiError.BadRequest("Некорректная ссылка активации")
        }
        user.isActivated = true
        await user.save()
    }

    async logout(refreshToken) {
        return await TokenService.removeToken(refreshToken)
    }

    async refresh(refreshToken) {
        if (!refreshToken) {
            throw new ApiError.UnauthorizedError()
        }
        const userData = TokenService.validateRefreshToken(refreshToken)
        const tokenFromDB = await TokenService.findToken(refreshToken)
        if (!userData || !tokenFromDB) {
            throw new ApiError.UnauthorizedError()
        }
        const user = await UsersYooking.findOne({where: {id: userData.id}});
        const userSaveToDtos = {
            id: user.id,
            email: user.email,
            phone: user.phone,
            isActivated: user.isActivated,
        }
        const userDto = new UserDtos(userSaveToDtos)
        const tokens = TokenService.generateTokens({...userDto})
        await TokenService.saveToken(userDto.id, tokens.refreshToken)
        return {...tokens, user: userDto}

    }
}

export default new UserService()