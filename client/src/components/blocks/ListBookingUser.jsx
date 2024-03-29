import {useDispatch, useSelector} from "react-redux";
import {Booking} from "../cards/Booking";
import {useEffect, useState} from "react";
import {Spinner} from "../spinner/Spinner";
import {loaderFavoriteAndBookingHandler} from "../../store/ClientData";
import UsersService from "../../services/users.service";
import {parseJSONData} from "../../utils/json-parse-object";


export const ListBookingUser = () => {
    const dispatch = useDispatch();
    const userId = useSelector((state) => state.auth.userId);
    const loaderFavoriteAndBooking = useSelector(state => state.client__data.loaderFavoriteAndBooking)
    const [width, setWidth] = useState(window.innerWidth);
    const [height, setHeight] = useState(window.innerHeight);
    const [user, setUser] = useState(null)
    const [bookingList, setBookingList] = useState([])


    useEffect(() => {
        if (bookingList.length === 0) {
            UsersService.getUserYooking("booking", userId)
                .then(user => {
                    setUser(user)
                    const bookingList = parseJSONData(user.bookingList)
                    setBookingList(bookingList)
                })
        }
        dispatch(loaderFavoriteAndBookingHandler(true));
        setTimeout(() => dispatch(loaderFavoriteAndBookingHandler(false)), 2000);
        const handleResize = () => {
            setWidth(window.innerWidth);
            setHeight(window.innerHeight);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        }

    }, []);


    if (loaderFavoriteAndBooking) {
        UsersService.getUserYooking("booking", userId)
            .then(user => {
                setUser(user)
                const bookingList = parseJSONData(user.bookingList)
                setBookingList(bookingList)
            })

    }

    return (
        <div className="column__c__c custom__container">
            <div className="row__fs booking__user__block">
                <div className="column__fs custom__content">
                    <h3 className={`borderBottom custom__title ${width > 425 ? "large" : ""}`}>Забронированные
                        объекты</h3>
                    {
                        loaderFavoriteAndBooking ?
                            <div className="column__c__c">
                                <Spinner/>
                            </div>
                            :
                            <div className="column custom__scroll">
                                {
                                    bookingList.length === 0 ? // проверка на пустую data
                                        <div className="row__c__c">
                                            <span className="text__content__grey__16">Список бронирования пуст</span>
                                        </div>
                                        :
                                        bookingList.map(booking => {
                                            return (
                                                <Booking
                                                    key={booking.id}
                                                    bookingId={booking.id}
                                                    numberId={booking.numberId}
                                                    booking={booking}
                                                    width={width}
                                                    user={user}
                                                    bookingList={bookingList}
                                                />
                                            )
                                        })
                                }
                            </div>
                    }
                </div>
            </div>
        </div>
    )
}