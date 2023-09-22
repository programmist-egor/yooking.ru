import {useSelector} from "react-redux";
import {Booking} from "../cards/Booking";
import {useEffect, useState} from "react";
import {Spinner} from "../spinner/Spinner";

export const ListBookingUser = () => {
    const bookingUserData = useSelector(state => state.client__data.bookingUserData)
    const clientCheckIn = useSelector(state => state.client__data.checkIn)
    const clientCheckOut = useSelector(state => state.client__data.checkOut)
    const loaderFavoriteAndBooking = useSelector(state => state.client__data.loaderFavoriteAndBooking)

    const [width, setWidth] = useState(window.innerWidth);
    const [height, setHeight] = useState(window.innerHeight);

    useEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth);
            setHeight(window.innerHeight);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, []);
    return (
        <div className="column__c__c " style={{marginLeft: "3%", marginRight: "3%"}}>
            <div className="row__fs booking__user__block"
                 style={{overflowX: "hidden", paddingBottom: "100px", overflowY: "hidden"}}>
                <div className="column__fs " style={{margin: "15px"}}>
                    {width >= 0 && width <= 425 ?
                        <h3 className="borderBottom" style={{paddingBottom: "10px"}}>Забронированные объекты</h3>
                        :
                        <h2 className="borderBottom" style={{paddingBottom: "10px"}}>Забронированные объекты</h2>
                    }
                    {loaderFavoriteAndBooking ?
                        <div className="column__c__c">
                            <Spinner/>
                        </div>
                        :
                        <div className="column" style={{overflowY: "scroll", height: "70vh"}}>
                            {bookingUserData.length === 0 ?
                                <div className="row__c__c">
                                    <span className="text__content__grey__16">Список бронирования пуст</span>
                                </div>
                                :
                                bookingUserData.map(booking => {
                                    return (
                                        <Booking
                                            header={booking.value.name}
                                            checkIn={clientCheckIn}
                                            checkOut={clientCheckOut}
                                            photos={booking.value.photos}
                                            item={booking.value}
                                            dateRange={booking.dateRange}
                                            guest={booking.guest}
                                            width={width}
                                            price={booking.price}
                                            id={booking.idObject}
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