import classnames from 'classnames';
import React from "react"
import { Icon24ArrowLeftOutline, Icon24ArrowRightOutline } from '@vkontakte/icons';

import './Calendar.css';
import * as calendar from "./index.js";

export default class Calendar extends React.Component {
    static defaultProps = {
        date: new Date(),
        years: [2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030],
        monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
        weekDayNames: ['Пн', 'Вт', 'Ср', 'Чт' , 'Пт', 'Сб', 'Вс'],
        onChangeCheckIn: Function.prototype,
        onChangeCheckOut: Function.prototype,
    };

    state = {
        date: this.props.date,
        currentDate: new Date(),
        selectedCheckInDate: null,
        selectedCheckOutDate: null,
    };

    get year() {
        return this.state.date.getFullYear();
    }

    get month() {
        return this.state.date.getMonth();
    }

    get day() {
        return this.state.date.getDate();
    }

    handlePrevMonthButtonClick = () => {
        const date = new Date(this.year, this.month - 1);

        this.setState({ date });
    };

    handleNextMonthButtonClick = () => {
        const date = new Date(this.year, this.month + 1);

        this.setState({ date });
    };

    handleSelectChange = () => {
        const year = this.yearSelect.value;
        const month = this.monthSelect.value;

        const date = new Date(year, month);

        this.setState({ date });
    };

    handleDayClick = (date, tab, length) => {
        if(tab.checkIn === true) {
            this.setState({ selectedCheckInDate: date });
            this.props.onChangeCheckIn({date: date, length: length});
        } else {
            this.setState({ selectedCheckOutDate: date });
            this.props.onChangeCheckOut({date: date, length: length});
        }
    };

    render() {
        const { years, monthNames, weekDayNames, tab } = this.props;
        const { currentDate, selectedCheckInDate, selectedCheckOutDate } = this.state;

        const monthData = calendar.getMonthData(this.year, this.month);

        return (
            <div className="calendar">
                <div
                    className="row__sa__c"
                    style={{
                        marginBottom: "10px"
                    }}
                >
                    <button onClick={this.handlePrevMonthButtonClick}><Icon24ArrowLeftOutline/></button>

                    <select
                        className="select__calendar"
                        ref={element => this.monthSelect = element}
                        value={this.month}
                        onChange={this.handleSelectChange}
                    >
                        {monthNames.map((name, index) =>
                            <option
                                key={name}
                                value={index}>
                                {name}
                            </option>
                        )}
                    </select>

                    <select
                        style={{display: "none"}}
                        ref={element => this.yearSelect = element}
                        value={this.year}
                        onChange={this.handleSelectChange}
                    >
                        {years.map(year =>
                            <option key={year} value={year}>{year}</option>
                        )}
                    </select>

                    <button onClick={this.handleNextMonthButtonClick}><Icon24ArrowRightOutline/></button>
                </div>

                <table>
                    <thead>
                    <tr>
                        {weekDayNames.map(name =>
                            <th key={name}>{name}</th>
                        )}
                    </tr>
                    </thead>

                    <tbody>
                    {monthData.map((week, index) =>
                        <tr key={index} className="week">
                            {week.map((date, index) => date ?
                                <td
                                    key={index}
                                    className={classnames('day', {
                                        'today': calendar.areEqual(date, currentDate),
                                        'selected': calendar.areEqual(date, tab.checkIn === true ? selectedCheckInDate : selectedCheckOutDate)
                                    })}
                                    onClick={() => this.handleDayClick(date, tab, date.getDate())}
                                >{date.getDate()}</td>
                                :
                                <td key={index} />
                            )}
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        );
    }
}