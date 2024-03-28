
export function getRandomInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//Распределение по страницам
export const pageDistribution = (array) => {
    const newHotelList = []
    const list = []
    const length = array.length;
    const step = 25;
    let res = length / step
    const countPage = Math.floor(res);
    let stepStart = 0
    let stepEnd = 25

    for (let i = 0; i < countPage + 1; i++) {
        newHotelList.push({
            id: i,
            hotels: array.slice(stepStart, stepEnd)
        })
        stepStart += 25
        stepEnd += 25
    }
    newHotelList.map(item => {
        if (item.hotels.length !== 0) {
            list.push(item)
        }
    });

    return{
        list,
        countPage
    }
}
