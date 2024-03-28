// Функция для форматирования числа в денежный формат
export function formatMoney(number) {
    // Преобразуем число в строку
    let str = number.toString();
    // Проверяем, есть ли десятичная точка или запятая
    let dotIndex = str.indexOf(".");
    let commaIndex = str.indexOf(",");
    // Если есть точка, то разделяем строку на целую и дробную части
    if (dotIndex > -1) {
        let integerPart = str.slice(0, dotIndex);
        let decimalPart = str.slice(dotIndex + 1);
        // Добавляем пробелы между тысячами в целой части
        integerPart = integerPart.replace(/\d{1,3}(?=(\d{3})+(?!\d))/g, "$& ");
        // Возвращаем отформатированную строку
        return integerPart + "," + decimalPart;
    }
    // Если есть запятая, то разделяем строку на целую и дробную части
    else if (commaIndex > -1) {
        let integerPart = str.slice(0, commaIndex);
        let decimalPart = str.slice(commaIndex + 1);
        // Добавляем пробелы между тысячами в целой части
        integerPart = integerPart.replace(/\d{1,3}(?=(\d{3})+(?!\d))/g, "$& ");
        // Возвращаем отформатированную строку
        return integerPart + "." + decimalPart;
    }
    // Если нет точки и запятой, то просто добавляем пробелы между тысячами
    else {
        return str.replace(/\d{1,3}(?=(\d{3})+(?!\d))/g, "$& ");
    }
}