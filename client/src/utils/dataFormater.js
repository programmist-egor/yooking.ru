export const dateFormater = (date) => {
    let arr = []
    const value = date.toLocaleDateString().replace(/[./]/g, "-");
    arr.push(value.slice(6, 10))
    arr.push(value.slice(3, 5))
    arr.push(value.slice(0, 2))
    return arr.join("-")
}

export const dayMonth = (value) => {
    switch (value.substr(3, 2)) {
        case "01":
            return "янв.";
        case "02":
            return "фев.";
        case "03":
            return "мар.";
        case "04":
            return "апр.";
        case "05":
            return "май.";
        case "06":
            return "июн.";
        case "07":
            return "июл.";
        case "08":
            return "авг.";
        case "09":
            return "сен.";
        case "10":
            return "окт.";
        case "11":
            return "ноя.";
        case "12":
            return "дек.";
    }
}

export const dataInit = () => {
    const start = new Date().getDate()
    const end = new Date().getDate() + 2
    const month = new Date().getMonth()


    const dayMonth = (value) => {
        switch (value) {
            case 0:
                return "янв.";
            case 1:
                return "фев.";
            case 2:
                return "мар.";
            case 3:
                return "апр.";
            case 4:
                return "май.";
            case 5:
                return "июн.";
            case 6:
                return "июл.";
            case 7:
                return "авг.";
            case 8:
                return "сен.";
            case 9:
                return "окт.";
            case 10:
                return "ноя.";
            case 11:
                return "дек.";
        }
    }

    return {checkIn: start, checkOut: end, month: dayMonth(month), countNight: 2}
}

export const monthText = (value) => {
    switch (value) {
        case 0:
            return "янв.";
        case 1:
            return "фев.";
        case 2:
            return "мар.";
        case 3:
            return "апр.";
        case 4:
            return "май.";
        case 5:
            return "июн.";
        case 6:
            return "июл.";
        case 7:
            return "авг.";
        case 8:
            return "сен.";
        case 9:
            return "окт.";
        case 10:
            return "ноя.";
        case 11:
            return "дек.";
    }
}