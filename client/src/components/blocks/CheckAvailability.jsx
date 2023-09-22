import {BLACK, GREY, GREY_BANNER, GREY_BLACK, GREY_WHITE, ORANGE, WHITE} from "../../theme/colors";
import {ButtonIcon} from "../buttons/ButtonIcon";
import {
    Icon28SyncOutline,
    Icon24CalendarOutline,
    Icon24ChevronDown,
    Icon24Search,
    Icon24Cancel
} from "@vkontakte/icons";
import {DataRange} from "../сalendar/DataRange";
import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {wordDeclension, wordDeclensionNight} from "../utils/word-declensions";
import {loadingListHandler, showCalendarHandler, showGuestHandler} from "../../store/HotelItem";
import {GuestHotelNumber} from "../search/GuestHotelNumber";
import Drawer from "react-modern-drawer";
import {finishedBookingHandler} from "../../store/ClientData";


export const CheckAvailability = () => {
    const handler = (event) => {
        console.log(event.target.value);
    }


    const dispatch = useDispatch()
    const cityOrHotel = useSelector(state => state.hotels_item.cityOrHotel)
    const showCalendar = useSelector(state => state.hotels_item.showCalendar)
    const showGuest = useSelector(state => state.hotels_item.showGuest)
    const [openDataRang, setOpenDataRang] = useState(false)
    const [openGuest, setGuest] = useState(false)
    const [checkOld, setCheckOld] = useState(false)
    const [phone, setPhone] = useState("");
    const [isOpen, setIsOpen] = React.useState(false)

    const toggleDrawer = () => {
        setIsOpen((prevState) => !prevState)
    }
    const handleClickOutsideGuestHotel = () => {
        setGuest(false);
        dispatch(showGuestHandler(false));
        handlerOpenGuest();
    };

    const handleClickOutsideDataRange = () => {
        setOpenDataRang(false);
        handlerDate();
    };


    const handlerDate = () => {
        setOpenDataRang(!openDataRang)
        dispatch(showCalendarHandler(!showCalendar))
    }

    const handlerOpenGuest = () => {
        setGuest(!openGuest)
        dispatch(showGuestHandler(!showGuest))
    }
    const checkingHandler = () => {
        if (cityOrHotel.guest.child.map(child => child.old === "Возраст")[0]) {
            setCheckOld(true)
        } else {
            setGuest(!openGuest)
            dispatch(showGuestHandler(!showGuest))
            setCheckOld(false)
        }
    }


    const handlerCheckedPlace = () => {
        console.log("ПРОВЕРКА СВОБОДНЫХ МЕСТ");
        dispatch(loadingListHandler({type: "hotelList", value: {res: false, time: 3000}}))
    }


    return (
        <div>
            <div className="column__fs desktop__super__mega__big__check__availability__block"
                 style={{
                     background: GREY_BANNER,
                     borderRadius: "20px",
                     padding: "20px",
                     height: "100%",
                     marginBottom: "40px",
                 }}
            >
                <div className="row__fs__fs">
                    <div className="row__sb__c inputCheckAvailability">
                        <div className="row__sb__c ">
                            <div style={{position: "relative", width: "300px"}}>
                                <div
                                    className="row__sb__c"
                                    onClick={() => handlerDate()}
                                    style={{width: "300px", cursor: "pointer"}}>
                                    <div className="row__c__fs" style={{marginLeft: "10px"}}>
                                        <Icon24CalendarOutline color={BLACK}/>
                                        <span className="text__content__black__14" style={{marginLeft: "10px"}}>
                                        {cityOrHotel.dataRange.checkIn} - {cityOrHotel.dataRange.checkOut} {cityOrHotel.dataRange.month}
                                            <span className="text__content__grey__14" style={{marginLeft: "5px"}}>
                                            {cityOrHotel.dataRange.countNight} {wordDeclensionNight(cityOrHotel.dataRange.countNight)}
                                        </span>
                                </span>
                                    </div>
                                    <span className={openDataRang ? 'iconDate' : "iconBtn"}>
                                    <Icon24ChevronDown color={GREY}/>
                                </span>
                                </div>
                                {
                                    openDataRang  && (
                                        <div
                                            className="click-outside-modal-handler"
                                            onClick={handleClickOutsideDataRange}
                                            style={{
                                                position: 'fixed',
                                                top: 0,
                                                left: 0,
                                                right: 0,
                                                bottom: 0,
                                                zIndex: 1,
                                            }}
                                        ></div>
                                    )
                                }
                                <DataRange
                                    style={showCalendar ? "modal__list__search" : "modal__none"}
                                    handle={() => handlerDate()}
                                    page={"hotel"}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="row__sb__c inputCheckAvailability">
                        <div style={{position: "relative", width: "300px"}}>
                            <div className="row__sb__c"
                                 onClick={() => handlerOpenGuest()}
                                 style={{width: "300px", cursor: "pointer"}}>
                                <div className="row__c__fs" style={{marginLeft: "10px"}}>
                                    <Icon24CalendarOutline color={BLACK}/>
                                    <span className=" text__content__black__14" style={{marginLeft: "10px"}}>
                                    {cityOrHotel.guest.adult + cityOrHotel.guest.child.length} {wordDeclension(cityOrHotel.guest.adult + cityOrHotel.guest.child.length)}
                                </span>
                                </div>
                                <span className={openGuest ? 'iconDate' : "iconBtn"}>
                                <Icon24ChevronDown color={GREY}/>
                            </span>
                            </div>
                            {
                                openGuest && (
                                    <div
                                        className="click-outside-modal-handler"
                                        onClick={handleClickOutsideGuestHotel}
                                        style={{
                                            position: 'fixed',
                                            top: 0,
                                            left: 0,
                                            right: 0,
                                            bottom: 0,
                                            zIndex: 1,
                                        }}
                                    ></div>
                                )
                            }
                            <GuestHotelNumber
                                style={showGuest ? "modal__guest" : "modal__none"}
                                guest={cityOrHotel.guest.adult}
                                child={cityOrHotel.guest.child}
                                handler={() => checkingHandler()}
                                checkOld={checkOld}
                            />
                        </div>
                    </div>
                    <ButtonIcon
                        handler={() => handlerCheckedPlace()}
                        icon={<Icon28SyncOutline width={24} height={24} color={WHITE}/>}
                        style={"checkAvailabilityBtn check__availability"}
                        name={"Проверить наличие мест"}
                        styleText={"text__content__white__16"}
                    />
                </div>
            </div>
            <div className="column__fs desktop__super__big__check__availability__block"
                 style={{
                     background: GREY_BANNER,
                     borderRadius: "20px",
                     padding: "20px",
                     height: "100%",
                     marginBottom: "40px",
                 }}
            >
                <div className="row__sb__c">
                    <div className="row__sb__c inputCheckAvailability">
                        <div className="row__sb__c checkAvailability__block">
                            <div className="checkAvailability__block">
                                <div
                                    className="row__sb__c checkAvailability__block"
                                    onClick={() => handlerDate()}
                                    style={{cursor: "pointer"}}>
                                    <div className="row__c__fs">
                                        <Icon24CalendarOutline color={BLACK}/>
                                        <span className="text__content__black__14" style={{marginLeft: "10px"}}>
                                        {cityOrHotel.dataRange.checkIn} - {cityOrHotel.dataRange.checkOut} {cityOrHotel.dataRange.month}
                                            <span className="text__content__grey__14" style={{marginLeft: "5px"}}>
                                            {cityOrHotel.dataRange.countNight} {wordDeclensionNight(cityOrHotel.dataRange.countNight)}
                                        </span>
                                </span>
                                    </div>
                                    <span className={openDataRang ? 'iconDate' : "iconBtn"}>
                                    <Icon24ChevronDown color={GREY}/>
                                </span>
                                </div>
                                {
                                    openDataRang  && (
                                        <div
                                            className="click-outside-modal-handler"
                                            onClick={handleClickOutsideDataRange}
                                            style={{
                                                position: 'fixed',
                                                top: 0,
                                                left: 0,
                                                right: 0,
                                                bottom: 0,
                                                zIndex: 1,
                                            }}
                                        ></div>
                                    )
                                }
                                <DataRange
                                    style={showCalendar ? "modal__list__search" : "modal__none"}
                                    handle={() => handlerDate()}
                                    page={"hotel"}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="null">____</div>
                    <div className="row__sb__c inputCheckAvailability">
                        <div className="checkAvailability__block">
                            <div className="row__sb__c checkAvailability__block"
                                 onClick={() => handlerOpenGuest()}
                                 style={{cursor: "pointer"}}>
                                <div className="row__c__fs">
                                    <Icon24CalendarOutline color={BLACK}/>
                                    <span className=" text__content__black__14" style={{marginLeft: "10px"}}>
                                    {cityOrHotel.guest.adult + cityOrHotel.guest.child.length} {wordDeclension(cityOrHotel.guest.adult + cityOrHotel.guest.child.length)}
                                </span>
                                </div>
                                <span className={openGuest ? 'iconDate' : "iconBtn"}>
                                <Icon24ChevronDown color={GREY}/>
                            </span>
                            </div>
                            {
                                openGuest && (
                                    <div
                                        className="click-outside-modal-handler"
                                        onClick={handleClickOutsideGuestHotel}
                                        style={{
                                            position: 'fixed',
                                            top: 0,
                                            left: 0,
                                            right: 0,
                                            bottom: 0,
                                            zIndex: 1,
                                        }}
                                    ></div>
                                )
                            }
                            <GuestHotelNumber
                                style={showGuest ? "modal__guest" : "modal__none"}
                                guest={cityOrHotel.guest.adult}
                                child={cityOrHotel.guest.child}
                                handler={() => checkingHandler()}
                                checkOld={checkOld}
                            />
                        </div>
                    </div>
                </div>
                <ButtonIcon
                    handler={() => handlerCheckedPlace()}
                    icon={<Icon28SyncOutline width={24} height={24} color={WHITE}/>}
                    style={"checkAvailabilityBtn check__availability"}
                    name={"Проверить наличие мест"}
                    styleText={"text__content__white__16"}
                />

            </div>
            <div className="column__fs desktop__big__check__availability__block"
                 style={{
                     background: GREY_BANNER,
                     borderRadius: "20px",
                     padding: "20px",
                     height: "100%",
                     marginBottom: "40px",
                 }}
            >
                <div className="row__sb__c">
                    <div className="row__sb__c inputCheckAvailability">
                        <div className="row__sb__c checkAvailability__block">
                            <div className="checkAvailability__block">
                                <div
                                    className="row__sb__c checkAvailability__block"
                                    onClick={() => handlerDate()}
                                    style={{cursor: "pointer"}}>
                                    <div className="row__c__fs" style={{marginLeft: "10px"}}>
                                        <Icon24CalendarOutline color={BLACK}/>
                                        <span className="text__content__black__14" style={{marginLeft: "10px"}}>
                                        {cityOrHotel.dataRange.checkIn} - {cityOrHotel.dataRange.checkOut} {cityOrHotel.dataRange.month}
                                            <span className="text__content__grey__14" style={{marginLeft: "5px"}}>
                                            {cityOrHotel.dataRange.countNight} {wordDeclensionNight(cityOrHotel.dataRange.countNight)}
                                        </span>
                                </span>
                                    </div>
                                    <span className={openDataRang ? 'iconDate' : "iconBtn"}>
                                    <Icon24ChevronDown color={GREY}/>
                                </span>
                                </div>
                                {
                                    openDataRang  && (
                                        <div
                                            className="click-outside-modal-handler"
                                            onClick={handleClickOutsideDataRange}
                                            style={{
                                                position: 'fixed',
                                                top: 0,
                                                left: 0,
                                                right: 0,
                                                bottom: 0,
                                                zIndex: 1,
                                            }}
                                        ></div>
                                    )
                                }
                                <DataRange
                                    style={showCalendar ? "modal__list__search" : "modal__none"}
                                    handle={() => handlerDate()}
                                    page={"hotel"}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="null">____</div>
                    <div className="row__sb__c inputCheckAvailability">
                        <div className="checkAvailability__block">
                            <div className="row__sb__c checkAvailability__block"
                                 onClick={() => handlerOpenGuest()}
                                 style={{cursor: "pointer"}}>
                                <div className="row__c__fs" style={{marginLeft: "10px"}}>
                                    <Icon24CalendarOutline color={BLACK}/>
                                    <span className=" text__content__black__14" style={{marginLeft: "10px"}}>
                                    {cityOrHotel.guest.adult + cityOrHotel.guest.child.length} {wordDeclension(cityOrHotel.guest.adult + cityOrHotel.guest.child.length)}
                                </span>
                                </div>
                                <span className={openGuest ? 'iconDate' : "iconBtn"}>
                                <Icon24ChevronDown color={GREY}/>
                            </span>
                            </div>
                            {
                                openGuest && (
                                    <div
                                        className="click-outside-modal-handler"
                                        onClick={handleClickOutsideGuestHotel}
                                        style={{
                                            position: 'fixed',
                                            top: 0,
                                            left: 0,
                                            right: 0,
                                            bottom: 0,
                                            zIndex: 1,
                                        }}
                                    ></div>
                                )
                            }
                            <GuestHotelNumber
                                style={showGuest ? "modal__guest" : "modal__none"}
                                guest={cityOrHotel.guest.adult}
                                child={cityOrHotel.guest.child}
                                handler={() => checkingHandler()}
                                checkOld={checkOld}
                            />
                        </div>
                    </div>
                </div>
                <ButtonIcon
                    handler={() => handlerCheckedPlace()}
                    icon={<Icon28SyncOutline width={24} height={24} color={WHITE}/>}
                    style={"checkAvailabilityBtn check__availability"}
                    name={"Проверить наличие мест"}
                    styleText={"text__content__white__16"}
                />

            </div>
            <div className="column__fs tablet__check__availability__block"
                 style={{
                     background: GREY_BANNER,
                     borderRadius: "20px",
                     padding: "20px",
                     height: "100%",
                     marginBottom: "40px",
                 }}
            >
                <div className="column__c">
                    <div className="row__sb__c inputCheckAvailability">
                        <div className="row__sb__c checkAvailability__block">
                            <div className="checkAvailability__block">
                                <div
                                    className="row__sb__c checkAvailability__block"
                                    onClick={() => handlerDate()}
                                    style={{cursor: "pointer"}}>
                                    <div className="row__c__fs" style={{marginLeft: "10px"}}>
                                        <Icon24CalendarOutline color={BLACK}/>
                                        <span className="text__content__black__14" style={{marginLeft: "10px"}}>
                                        {cityOrHotel.dataRange.checkIn} - {cityOrHotel.dataRange.checkOut} {cityOrHotel.dataRange.month}
                                            <span className="text__content__grey__14" style={{marginLeft: "5px"}}>
                                            {cityOrHotel.dataRange.countNight} {wordDeclensionNight(cityOrHotel.dataRange.countNight)}
                                        </span>
                                </span>
                                    </div>
                                    <span className={openDataRang ? 'iconDate' : "iconBtn"}>
                                    <Icon24ChevronDown color={GREY}/>
                                </span>
                                </div>
                                {
                                    openDataRang  && (
                                        <div
                                            className="click-outside-modal-handler"
                                            onClick={handleClickOutsideDataRange}
                                            style={{
                                                position: 'fixed',
                                                top: 0,
                                                left: 0,
                                                right: 0,
                                                bottom: 0,
                                                zIndex: 1,
                                            }}
                                        ></div>
                                    )
                                }
                                <DataRange
                                    style={showCalendar ? "modal__list__search" : "modal__none"}
                                    handle={() => handlerDate()}
                                    page={"hotel"}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="null">____</div>
                    <div className="row__sb__c inputCheckAvailability">
                        <div className="checkAvailability__block">
                            <div className="row__sb__c checkAvailability__block"
                                 onClick={() => handlerOpenGuest()}
                                 style={{cursor: "pointer"}}>
                                <div className="row__c__fs" style={{marginLeft: "10px"}}>
                                    <Icon24CalendarOutline color={BLACK}/>
                                    <span className=" text__content__black__14" style={{marginLeft: "10px"}}>
                                    {cityOrHotel.guest.adult + cityOrHotel.guest.child.length} {wordDeclension(cityOrHotel.guest.adult + cityOrHotel.guest.child.length)}
                                </span>
                                </div>
                                <span className={openGuest ? 'iconDate' : "iconBtn"}>
                                <Icon24ChevronDown color={GREY}/>
                            </span>
                            </div>
                            {
                                openGuest && (
                                    <div
                                        className="click-outside-modal-handler"
                                        onClick={handleClickOutsideGuestHotel}
                                        style={{
                                            position: 'fixed',
                                            top: 0,
                                            left: 0,
                                            right: 0,
                                            bottom: 0,
                                            zIndex: 1,
                                        }}
                                    ></div>
                                )
                            }
                            <GuestHotelNumber
                                style={showGuest ? "modal__guest" : "modal__none"}
                                guest={cityOrHotel.guest.adult}
                                child={cityOrHotel.guest.child}
                                handler={() => checkingHandler()}
                                checkOld={checkOld}
                            />
                        </div>
                    </div>
                </div>
                <ButtonIcon
                    handler={() => handlerCheckedPlace()}
                    icon={<Icon28SyncOutline width={24} height={24} color={WHITE}/>}
                    style={"checkAvailabilityBtn check__availability"}
                    name={"Проверить наличие мест"}
                    styleText={"text__content__white__16"}
                />

            </div>
            <div className="column__fs mobile__check__availability__block">
                <Drawer
                    open={isOpen}
                    onClose={toggleDrawer}
                    direction='bottom'
                    style={{height: "80vh", overflowY: "scroll"}}
                >
                    <div
                        className="column"
                        style={{
                            background: WHITE,
                            padding: "20px",
                            height: "100%",
                            marginBottom: "30px",
                        }}
                    >
                        <div className="row__sb__c">
                            <h4>Выберите дату и количество гостей</h4>
                            <span onClick={() => toggleDrawer()}
                                  style={{cursor: "pointer"}}>
                               <Icon24Cancel color={GREY_BLACK}/>
                            </span>
                        </div>
                        <div className="column__c">
                            <div className="row__sb__c inputCheckAvailability">
                                <div className="row__sb__c checkAvailability__block">
                                    <div className="checkAvailability__block">
                                        <div
                                            className="row__sb__c checkAvailability__block"
                                            onClick={() => handlerDate()}
                                            style={{cursor: "pointer"}}>
                                            <div className="row__c__fs" style={{marginLeft: "10px"}}>
                                                <Icon24CalendarOutline color={BLACK}/>
                                                <span className="text__content__black__14" style={{marginLeft: "10px"}}>
                                        {cityOrHotel.dataRange.checkIn} - {cityOrHotel.dataRange.checkOut} {cityOrHotel.dataRange.month}
                                                    <span className="text__content__grey__14"
                                                          style={{marginLeft: "5px"}}>
                                            {cityOrHotel.dataRange.countNight} {wordDeclensionNight(cityOrHotel.dataRange.countNight)}
                                        </span>
                                </span>
                                            </div>
                                            <span className={openDataRang ? 'iconDate' : "iconBtn"}>
                                    <Icon24ChevronDown color={GREY}/>
                                </span>
                                        </div>
                                        {
                                            openDataRang  && (
                                                <div
                                                    className="click-outside-modal-handler"
                                                    onClick={handleClickOutsideDataRange}
                                                    style={{
                                                        position: 'fixed',
                                                        top: 0,
                                                        left: 0,
                                                        right: 0,
                                                        bottom: 0,
                                                        zIndex: 1,
                                                    }}
                                                ></div>
                                            )
                                        }
                                        <DataRange
                                            style={showCalendar ? "modal__list__search" : "modal__none"}
                                            handle={() => handlerDate()}
                                            page={"hotel"}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="null">____</div>
                            <div className="row__sb__c inputCheckAvailability">
                                <div className="checkAvailability__block">
                                    <div className="row__sb__c checkAvailability__block"
                                         onClick={() => handlerOpenGuest()}
                                         style={{cursor: "pointer"}}>
                                        <div className="row__c__fs" style={{marginLeft: "10px"}}>
                                            <Icon24CalendarOutline color={BLACK}/>
                                            <span className=" text__content__black__14" style={{marginLeft: "10px"}}>
                                    {cityOrHotel.guest.adult + cityOrHotel.guest.child.length} {wordDeclension(cityOrHotel.guest.adult + cityOrHotel.guest.child.length)}
                                </span>
                                        </div>
                                        <span className={openGuest ? 'iconDate' : "iconBtn"}>
                                <Icon24ChevronDown color={GREY}/>
                            </span>
                                    </div>
                                    {
                                        openGuest && (
                                            <div
                                                className="click-outside-modal-handler"
                                                onClick={handleClickOutsideGuestHotel}
                                                style={{
                                                    position: 'fixed',
                                                    top: 0,
                                                    left: 0,
                                                    right: 0,
                                                    bottom: 0,
                                                    zIndex: 1,
                                                }}
                                            ></div>
                                        )
                                    }
                                    <GuestHotelNumber
                                        style={showGuest ? "modal__guest" : "modal__none"}
                                        guest={cityOrHotel.guest.adult}
                                        child={cityOrHotel.guest.child}
                                        handler={() => checkingHandler()}
                                        checkOld={checkOld}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </Drawer>
                <div className="row__c__fs"
                     style={{background: WHITE, height: "60px", borderRadius: "10px", marginBottom: "40px"}}>
                    <div
                        className="row__c__c"
                        style={{
                            padding: "8px",
                            background: ORANGE,
                            borderRadius: "50%",
                            cursor: "pointer",
                            marginLeft: "10px",
                            marginRight: "15px"
                        }}
                        onClick={() => handlerCheckedPlace()}
                    >
                        <Icon24Search width={30} height={30} color={WHITE}/>
                    </div>
                    <div className="column__fs__c" onClick={() => toggleDrawer()} style={{width: "200px"}}>
                        <span className="text__content__black__b__16"
                              style={{marginBottom: "5px"}}>  {cityOrHotel.dataRange.checkIn} - {cityOrHotel.dataRange.checkOut} {cityOrHotel.dataRange.month}</span>
                        <span
                            className="text__content__grey__12"> {cityOrHotel.guest.adult + cityOrHotel.guest.child.length} {wordDeclension(cityOrHotel.guest.adult + cityOrHotel.guest.child.length)}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}