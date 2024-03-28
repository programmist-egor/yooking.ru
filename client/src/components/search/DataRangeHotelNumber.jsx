// import Calendar from "../calendar/Calendar";
// import {useState} from "react";
// import {useDispatch, useSelector} from "react-redux";
// import {checkInHandler, checkOutHandler, handlerDataRange, showCalendarHandler} from "../../store/HotelItem";
// import {dayMonth} from "../hooks/dataFormater";
//
// export const DataRangeHotelNumber = ({style, handle, styles}) => {
//     const dispatch = useDispatch()
//     const [checkIn, setCheckIn] = useState("Sat Jul 22 2023 00:00:00 GMT+0700 (Новосибирск, стандартное время)")
//     const [checkOut, setCheckOut] = useState("Sat Jul 29 2023 00:00:00 GMT+0700 (Новосибирск, стандартное время)")
//     const [tab, setTab] = useState({checkIn: true, checkOut: false})
//     const [warning, setWarning] = useState(false)
//     const [maxNight, setMaxNight] = useState({count: 30, result: false})
//     const [checkOne, setCheckOne] = useState(false)
//     const [checkTwo, setCheckTwo] = useState(false)
//     const showCalendar = useSelector(state => state.hotels_item.showCalendar)
//
//     // const dayMonth = (value) => {
//     //     switch (value.substr(3, 2)) {
//     //         case "01":
//     //             return "янв.";
//     //         case "02":
//     //             return "фев.";
//     //         case "03":
//     //             return "мар.";
//     //         case "04":
//     //             return "апр.";
//     //         case "05":
//     //             return "май.";
//     //         case "06":
//     //             return "июн.";
//     //         case "07":
//     //             return "июл.";
//     //         case "08":
//     //             return "авг.";
//     //         case "09":
//     //             return "сен.";
//     //         case "10":
//     //             return "окт.";
//     //         case "11":
//     //             return "ноя.";
//     //         case "12":
//     //             return "дек.";
//     //     }
//     // }
//
//     const closeCalendar = () => {
//         handle()
//         dispatch(showCalendarHandler(!showCalendar))
//         setWarning(false)
//     }
//     const dateRange = () => {
//         if (checkOne && checkTwo) {
//             let startDate = Date.parse(checkIn);
//             let endDate = Date.parse(checkOut);
//             let array = []
//             for (let i = startDate; i < endDate; i = i + 24 * 60 * 60 * 1000) {
//                 let s = 0
//                 s++
//                 array.push(s)
//                 new Date(i).toISOString()
//             }
//
//
//             if(array.length > maxNight.count) {
//                 setMaxNight({count: 30, result: true})
//                 setWarning(false)
//                 // array.length = 30
//             } else {
//                 dispatch(handlerDataRange(
//                     {
//                         checkIn: checkIn.toLocaleDateString().substr(0, 2),
//                         checkOut: checkOut.toLocaleDateString().substr(0, 2),
//                         month:
//                             checkIn.toLocaleDateString().substr(3, 2) === checkOut.toLocaleDateString().substr(3, 2) ?
//                                 dayMonth(checkIn.toLocaleDateString()) :
//                                 `(${dayMonth(checkIn.toLocaleDateString())} - ${dayMonth(checkOut.toLocaleDateString())})`,
//                         countNight: array.length
//                     }))
//                 handle()
//                 setWarning(false)
//                 setMaxNight({count: 30, result: false})
//             }
//         } else {
//             setWarning(true)
//         }
//     }
// const dateFormater = (date) => {
//     let arr = []
//     const value = date.toLocaleDateString().replace(/[./]/g, "-");
//     console.log(value.slice(0, 2));
//     arr.push(value.slice(6, 10))
//     arr.push(value.slice(3, 5))
//     arr.push(value.slice(0, 2))
//     return  arr.join("-")
// }
//     const handlerChooseCheckIn = (checkIn) => {
//         dispatch(checkInHandler(dateFormater(checkIn.date)))
//         dateFormater(checkIn.date)
//         setCheckIn(checkIn.date)
//         setCheckOne(true)
//     }
//     const handlerChooseCheckOut = (checkOut) => {
//         dispatch(checkOutHandler(dateFormater(checkOut.date)))
//         setCheckOut(checkOut.date)
//         setCheckTwo(true)
//     }
//
//     return (
//         <div className={style}>
//             <div
//                 className="modal__content__date__range"
//                 style={styles}
//             >
//                 <div className="modal__body">
//                     <div
//                         className="column__sb"
//                         style={{
//                             marginRight: "10px",
//                             height: "100%"
//                         }}
//                     >
//                         <div
//                             className="row__sa__c"
//                             style={{
//                                 marginBottom: "10px",
//                             }}
//                         >
//                             <span
//                                 className={tab.checkIn === true ? "text__content__black__14 tab__btn" : "text__content__grey__14 tab__btn__none"}
//                                 onClick={() => setTab({checkIn: true, checkOut: false})}
//                             >Дата заезда</span>
//                             <span
//                                 className={tab.checkIn === true ? "text__content__grey__14 tab__btn__none" : "text__content__black__14 tab__btn"}
//                                 onClick={() => setTab({checkIn: false, checkOut: true})}
//                             >Дата отъезда</span>
//                         </div>
//                         <div
//                             style={{
//                                 height: "250px"
//                             }}
//                         >
//                             {tab.checkIn === true ?
//                                 <Calendar onChangeCheckIn={(checkIn) => handlerChooseCheckIn(checkIn)} tab={tab}/>
//                                 :
//                                 <Calendar onChangeCheckOut={(checkOut) => handlerChooseCheckOut(checkOut)} tab={tab}/>
//                             }
//                         </div>
//
//                             {warning === true ?
//                                 <span
//                                     className={"text__content__grey__12"}
//                                     style={{
//                                         display: "flex",
//                                         justifyContent: "center",
//                                         alignItems: "center",
//                                         padding: "5px"
//                                     }}
//                                 >
//                                 Выберите даты заезда и отъезда!
//                             </span> :
//                                 ""
//                             }
//                         {maxNight.result === true ?
//                             <span
//                                 className={"text__content__grey__12"}
//                                 style={{
//                                     display: "flex",
//                                     justifyContent: "center",
//                                     alignItems: "center",
//                                     padding: "5px"
//                                 }}
//                             >
//                                 Максимальное количество ночей 30!
//                             </span> :
//                             ""
//                         }
//                     </div>
//                     <div
//                         className="text__content__orange__b__16"
//                         style={{
//                             display: "flex",
//                             justifyContent: "space-around",
//                             alignItems: "center",
//                             cursor: "pointer",
//                             marginTop: "10px",
//                             marginBottom: "20px"
//                         }}
//                     >
//                         <span
//                             className="text__content__orange__b__16"
//                             onClick={() => dateRange()}
//                         >Выбрать</span>
//                         <span
//                             className="text__content__orange__b__16"
//                             onClick={() => closeCalendar()}
//                         >Закрыть</span>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }