import React, {useState} from "react";
import {Icon24ChevronDown} from "@vkontakte/icons";
import {GREY} from "../../theme/colors";


export const CheckInSelect = ({options, placeholder, checkIn, setCheckIn}) => {
    const [isOpen, setIsOpen] = useState(false);


    const toggling = () => setIsOpen(!isOpen);

    const onOptionClicked = value => () => {
        setCheckIn(value);
        setIsOpen(false);
    }

    return (
        <div className="custom-select-wrapper" >
            <div className="selectCustom text__content__black__14"  onClick={toggling}>
                {checkIn || placeholder}
                <span className={isOpen ? 'iconDate' : "iconBtn"}>
                    <Icon24ChevronDown color={GREY}/>
                </span>
            </div>
            {isOpen && (
                <div className="custom-select-list text__content__black__14">
                    {options.map((option, index) =>
                        <div onClick={onOptionClicked(option.value)} key={index} className="custom-select-item">
                            {option.value}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}