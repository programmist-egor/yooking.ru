import React, { useState} from "react";
import {dateFormater, dayMonth} from "../hooks/dataFormater";
import {useDispatch, useSelector} from "react-redux";
import  * as dataRange from "../../store/HotelItem";
import "./Calendar.css"



export const DataRange = ({style, handle, styles, page}) => {
    const dispatch = useDispatch()
    const [selectedStartDate, setSelectedStartDate] = useState(null);
    const [selectedEndDate, setSelectedEndDate] = useState(null);
    const [hoveredDate, setHoveredDate] = useState(null);
    const [isSelectingEndDate, setIsSelectingEndDate] = useState(false);
    const [message, setMessage] = useState("");
    const [nightsCount, setNightsCount] = useState(0);




    const isLeapYear = (year) => {
        return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    };

    const getMonthsList = () => {
        const allMonths = [
            {name: "Январь", days: 31},
            {name: "Февраль", days: 28},
            {name: "Март", days: 31},
            {name: "Апрель", days: 30},
            {name: "Май", days: 31},
            {name: "Июнь", days: 30},
            {name: "Июль", days: 31},
            {name: "Август", days: 31},
            {name: "Сентябрь", days: 30},
            {name: "Октябрь", days: 31},
            {name: "Ноябрь", days: 30},
            {name: "Декабрь", days: 31},
        ];
        const monthsList = [];
        const currentYear = new Date().getFullYear();
        const currentMonthIndex = new Date().getMonth(); // Получить текущий номер месяца (0-11)

        for (let year = currentYear; year <= currentYear + 5; year++) {
            for (let index = 0; index < allMonths.length; index++) {
                // Для первого года добавить только месяцы, начиная с текущего месяца
                if (year === currentYear && index < currentMonthIndex) {
                    continue;
                }

                const month = allMonths[index];
                // Если индекс месяца равен 1 (Февраль) и данный год високосный, то количество дней будет 29
                const daysInMonth = index === 1 && isLeapYear(year) ? 29 : month.days;
                monthsList.push({
                    year: year,
                    name: month.name,
                    days: daysInMonth,
                    index: index,
                });
            }
        }
        return monthsList;
    };

    const isToday = (date) => {
        const today = new Date();
        return date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear();
    };

    const calculateNights = (startDate, endDate) => {
        if (!startDate || !endDate) return 0;
        const timeDifference = Math.abs(endDate - startDate);
        return Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
    };



    const handleDateSelect = (day) => {
        if (isGrayedOut(day)) {
            return;
        }

        if (!selectedStartDate) {
            setSelectedStartDate(day);

            console.log("Выбор даты заезда ")
            setIsSelectingEndDate(true);
        } else if (!selectedEndDate) {
            if (day < selectedStartDate) {
                setSelectedStartDate(day);
            } else {
                const maxEndDate = new Date(selectedStartDate);
                maxEndDate.setDate(selectedStartDate.getDate() + 30);
                const endDate = day > maxEndDate ? maxEndDate : day;
                setSelectedEndDate(endDate);
                //Закрыть модальное окно
                handle()
                saveDataRange(selectedStartDate, endDate)
                console.log("Выбор даты отъезда")
                setIsSelectingEndDate(false);
                // setNightsCount(nights);
            }
        } else {
            setSelectedStartDate(day);
            setSelectedEndDate(null);
            setIsSelectingEndDate(true);
        }
    };

    const dateText = selectedStartDate
        ? `Check-In: ${selectedStartDate}`
        : "Check-In: -";
    const endDateText = selectedEndDate
        ? `Check-Out: ${selectedEndDate}`
        : "Check-Out: -";
    const nightsText = nightsCount ? `${nightsCount} Nights` : "";




    const saveDataRange = (startDate, endDate) => {
        if(page === "search") {
            const nights = calculateNights(startDate, endDate);
            const end = dateFormater(endDate)
            const start = dateFormater(startDate)
            //Сохранение даты заезда и отъезда, а также количество ночей
              const dataRange = {
                    checkIn: startDate.toLocaleDateString().substr(0, 2),
                    checkOut: endDate.toLocaleDateString().substr(0, 2),
                    month:
                        startDate.toLocaleDateString().substr(3, 2) === endDate.toLocaleDateString().substr(3, 2) ?
                            dayMonth(startDate.toLocaleDateString()) :
                            `(${dayMonth(startDate.toLocaleDateString())} - ${dayMonth(endDate.toLocaleDateString())})`,
                    countNight: nights
                }

            handle("DataRange", {checkIn: start, checkOut: end, dataRange: dataRange} )
        }
        if(page === "hotel") {
            const nights = calculateNights(startDate, endDate);
            const end = dateFormater(endDate)
            dispatch(dataRange.checkOutHandler(end))
            const start = dateFormater(startDate)
            dispatch(dataRange.checkInHandler(start))
            //Сохранение даты заезда и отъезда, а также количество ночей
            dispatch(dataRange.handlerDataRange(
                {
                    checkIn: startDate.toLocaleDateString().substr(0, 2),
                    checkOut: endDate.toLocaleDateString().substr(0, 2),
                    month:
                        startDate.toLocaleDateString().substr(3, 2) === endDate.toLocaleDateString().substr(3, 2) ?
                            dayMonth(startDate.toLocaleDateString()) :
                            `(${dayMonth(startDate.toLocaleDateString())} - ${dayMonth(endDate.toLocaleDateString())})`,
                    countNight: nights
                }))
        }
    }


    const isFirstSelectedDay = (day) => {
        if (!selectedStartDate) return false;
        return day.getTime() === selectedStartDate.getTime();
    };

    const isLastSelectedDay = (day) => {
        if (!selectedEndDate) return false;
        return day.getTime() === selectedEndDate.getTime();
    };

    const isSelectedDay = (day) => {
        if (!selectedStartDate || !selectedEndDate) return false;
        return day > selectedStartDate && day < selectedEndDate;
    };

    const isGrayedOut = (day) => {
        if (isBeforeToday(day)) {
            return true;
        }

        if (selectedStartDate) {
            const daysAfterStartDate = Math.floor((day.getTime() - selectedStartDate.getTime()) / (1000 * 60 * 60 * 24));
            return daysAfterStartDate > 30;
        }

        return false;
    };


    const isBeforeToday = (date) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return date < today;
    };

    const isTemporarySelectedDay = (day) => {
        if (!selectedStartDate || !hoveredDate || !isSelectingEndDate || isBeforeToday(day)) return false;
        if (isGrayedOut(day)) return false;
        return day.getTime() > selectedStartDate.getTime() && day.getTime() < hoveredDate.getTime();
    };

    const handleMouseEnter = (day) => {
        if (isSelectingEndDate && !isBeforeToday(day)) {
            setHoveredDate(day);

            if (isGrayedOut(day)) {
                setMessage("* Нельзя выбрать даты с периодом больше 30 дней");
            } else if (day.getTime() === new Date().setHours(0, 0, 0, 0) && selectedEndDate !== null) {
                setMessage("* Нельзя выбрать дату раньше заезда");
            } else {
                setMessage("");
            }
        } else if (isBeforeToday(day)) {
            setMessage("* Нельзя выбрать даты из прошлого");
        }
    };


    const renderMonthDays = (month) => {
        const days = [];
        const firstDayOfMonth = new Date(month.year, month.index, 1);
        for (let i = 1; i <= (firstDayOfMonth.getDay() + 6) % 7; i++) {
            days.push(<div key={`empty-${i}`} className="day empty"></div>);
        }

        for (let i = 1; i <= month.days; i++) {
            const day = new Date(month.year, month.index, i);
            days.push(
                <div
                    key={day.toString()}
                    className={
                        "day" +
                        (isFirstSelectedDay(day) ? " selected-start" : "") +
                        (isLastSelectedDay(day) ? " selected-end" : "") +
                        (isBeforeToday(day) ? " text-gray" : "") +
                        (isToday(day) ? " today" : "") +
                        (isSelectedDay(day) ? " between-selected" : "") +
                        (isTemporarySelectedDay(day) ? " between-hovered" : "") +
                        (isGrayedOut(day) ? " grayed-out" : "") +
                        (isGrayedOut(day) ? " no-pointer" : "") +
                        " non-empty" // добавьте этот класс для не-pустых элементов
                    }
                    onClick={() => handleDateSelect(day)}
                    onMouseEnter={() => handleMouseEnter(day)}
                    onMouseLeave={() => {
                        isSelectingEndDate && !isBeforeToday(day) && setHoveredDate(null);
                        setMessage("");
                    }}

                >
                    {i}
                </div>
            );
        }

        return days;
    };

    const monthsList = getMonthsList();


    return (
        <div className={style}>
            <div className="modal__content__date__range" style={styles}>
                <div className="modal__body">
                    <div className="calendar">
                        <div className="calendar-header">
                            <div className="weekdays">
                                <span>Пн</span>
                                <span>Вт</span>
                                <span>Ср</span>
                                <span>Чт</span>
                                <span>Пт</span>
                                <span>Сб</span>
                                <span>Вс</span>
                            </div>
                        </div>
                        <div className="calendar-body">
                            <div className="months" >
                                {monthsList.map((month, index) => (
                                    <div key={index} className="month-container">
                                        <div className="month-label">
                                            {month.name} {month.year}
                                        </div>
                                        <div className="month-grid">{renderMonthDays(month)}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="row__c__c" style={{padding: "5px", height: "14px"}}>
                            <div className="message">{message}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


