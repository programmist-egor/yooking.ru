import * as yup from "yup";

export const validateName = async (name) => {
    const schema = yup.string().required("Поле 'Имя' обязательно для заполнения.");
    return schema.validate(name);
};

export const validateLastName = async (lastName) => {
    const schema = yup.string().required("Поле 'Фамилия' обязательно для заполнения.");
    return schema.validate(lastName);
};
// Email для гостей
export const validateEmail = email => {
    const schema = yup.string().required().email();
    return schema.validate(email);
}
// Для номера телефона
export const validatePhoneNumber = (phone) => {
    const schema = yup.string()
        .matches(/^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/, { message: "Неверный номер телефона" })
        .required("Обязательное поле")
    return schema.validate(phone);
};

export const validateObject = object => {
    const schema = yup.object().shape({}).notOneOf([{}], "Объект не должен быть пустым.").required();
    return schema.validate(object);
}
// Время отъезда и заезда
export const validateCheckInCheckOut = area => {
    const schema = yup.string().required();
    return schema.validate(area);
}