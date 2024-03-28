import * as yup from "yup";

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
// min 5 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit.

export const basicSchema = yup.object().shape({
    email: yup.string().email("Введите, пожалуйста, действительный адрес электронной почты").required("Обязательное поле"),
    password: yup
        .string()
        .min(5)
        .matches(passwordRules, { message: "Пожалуйста, создайте более надежный пароль" })
        .required("Обязательное поле"),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref("password"), null], "Пароли должны совпадать")
        .required("Обязательное поле"),
    phone: yup
        .string()
        .matches(/^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/, { message: "Неверный номер телефона" })
        .required("Обязательное поле")
});
export const loginSchema = yup.object().shape({
    email_login: yup.string().email("Адрес электронной почты не действителен").required("Обязательное поле"),
    password_login: yup
        .string()
        .min(5)
        .matches(passwordRules, { message: "Неверный пароль" })
        .required("Обязательное поле"),
});
export const resetEmailSchema = yup.object().shape({
    email_login: yup.string().email("Адрес электронной почты не действителен").required("Обязательное поле"),
});
export const advancedSchema = yup.object().shape({
    username: yup
        .string()
        .min(3, "Username must be at least 3 characters long")
        .required("Обязательное поле"),
    jobType: yup
        .string()
        .oneOf(["designer", "developer", "manager", "other"], "Invalid Job Type")
        .required("Обязательное поле"),
    acceptedTos: yup
        .boolean()
        .oneOf([true], "Please accept the terms of service"),
});