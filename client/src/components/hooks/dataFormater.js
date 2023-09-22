export const dateFormater = (date) => {
    let arr = []
    const value = date.toLocaleDateString().replace(/[./]/g, "-");
    console.log(value.slice(0, 2));
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