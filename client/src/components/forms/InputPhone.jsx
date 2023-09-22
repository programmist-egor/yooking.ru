import React from "react";
import InputMask from "react-input-mask";

// Создаем компонент PhoneInput
function InputPhone(props) {
    // Функция для обработки изменения значения поля ввода
    function handleChange(event) {
        // Получаем значение поля ввода
        const value = event.target.value;
        // Проверяем, соответствует ли значение маске
        const regex = /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/;
        if (regex.test(value)) {
            // Если да, то вызываем функцию onChange из props с очищенным значением
            props.onChange(value.replace(/\D/g, ""));
        } else {
            // Если нет, то вызываем функцию onChange из props с пустым значением
            props.onChange("");
        }
    }

    // Возвращаем JSX для рендеринга компонента
    return (
        <InputMask
            mask="+7 (999) 999-99-99"
            maskChar=" "
            value={props.value}
            onChange={handleChange}
        >
            {(inputProps) => (
                <input {...inputProps} type="tel" placeholder="Введите номер телефона" className="inputQuickBookingPhone" />
            )}
        </InputMask>
    );
}

// Экспортируем компонент PhoneInput
export default InputPhone;