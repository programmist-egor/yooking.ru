// wordDeclension.js
export function wordDeclension(value) {
    switch (value) {
        case 1:
            return "Гость";
        case 2:
            return "Гостя";
        case 3:
            return "Гостя";
        case 4:
            return "Гостя";
        case 21:
            return "Гость";
        case 22:
            return "Гостя";
        case 23:
            return "Гостя";
        case 24:
            return "Гостя";
        default:
            return "Гостей"
    }
}

// wordDeclensionNumber.js
export function wordDeclensionNumber(value) {
    switch (value) {
        case 1:
            return "Номер";
        case 2:
            return "Номера";
        case 3:
            return "Номера";
        case 4:
            return "Номера";
        case 21:
            return "Номер";
        case 22:
            return "Номера";
        case 23:
            return "Номера";
        case 24:
            return "Номера";
        default:
            return "Номеров"
    }
}

// wordDeclensionNight.js
export function wordDeclensionNight(value) {
    switch (value) {
        case 1:
            return "Ночь";
        case 2:
            return "Ночи";
        case 3:
            return "Ночи";
        case 4:
            return "Ночи";
        case 21:
            return "Ночь";
        case 22:
            return "Ночи";
        case 23:
            return "Ночи";
        case 24:
            return "Ночи";
        case 31:
            return "Ночь";
        default:
            return "Ночей"
    }
}

export function getAccommodationCity(city) {
    const lastChar = city[city.length - 1];
    const lastTwoChars = city.slice(-2);

    if (lastTwoChars === "ов" || lastTwoChars === "ин" || lastTwoChars === "ый" || lastTwoChars === "ск"|| lastTwoChars === "рг") {
        return city + "е";
    } else if (lastChar === "а") {
        return city.slice(0, -1) + "е";
    } else {
        return city;
    }
}