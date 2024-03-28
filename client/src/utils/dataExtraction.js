export function extractData(string) {
    const regionIndex = string.indexOf('р-н');
    if (regionIndex !== -1) {
        const startIndex = string.lastIndexOf(',', regionIndex) + 1;
        const endIndex = string.indexOf(',', regionIndex);
        if (startIndex !== -1 && endIndex !== -1) {
            return string.substring(startIndex, endIndex).trim();
        }
    }

    return "";
}
export function extractDigits(array) {
    const digits = [];

    for (let i = 0; i < array.length; i++) {
        const element = array[i];
        const firstTwoDigits = element.toString().split('.')[0].slice(0, 2);
        digits.push(firstTwoDigits);
    }

    const result = digits.join('');
    return result;
}

export function extractValueAfterComma(string) {
    const commaIndex = string.indexOf(",");  // Находим индекс первой запятой
    if (commaIndex !== -1) {  // Если найдена запятая
        const extractedValue = string.substring(commaIndex + 1).trim();  // Извлекаем значение после запятой, убираем лишние пробелы
        return extractedValue;
    }
    return null;  // Если не найдена запятая, возвращаем null
}

export function extractDataBeforeComma(str) {
    const index = str.indexOf(',');
    if (index !== -1) {
        return str.slice(0, index).trim();
    } else {
        return str.trim();
    }
}