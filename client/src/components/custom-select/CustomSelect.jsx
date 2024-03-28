import React, {useEffect, useState} from 'react';
import "./CustomSelect.css"
import {Icon24ChevronDown} from "@vkontakte/icons";
import {GREY} from "../../theme/colors";

const CustomSelect = (
    {
        options, placeholder, selectedOption, type, setFilterObject, setOptionCity, mb, loadDataObject, setFilterData,
        loadData, typeData, setTypeObj, setSelectedOption, width, chooseStatus, binding,
    }) => {
    const [isOpen, setIsOpen] = useState(false);


    const toggling = () => setIsOpen(!isOpen);

    const onOptionClicked = value => () => {
        setSelectedOption(value.name);
        if (type === "typeObj") {
            setTypeObj(value.value)
        }
        if (type === "clear") {
            setTypeObj("")
            setFilterData([])
            setOptionCity([{name: "Список пуст"}])
            setFilterObject("")
        }
        if (typeData === "data") {
            loadData(value.value)
        }
        if (typeData === "dataObject") {
            loadDataObject(value.value)
        }
        if (typeData === "status") {
            chooseStatus(value)
        }


        setIsOpen(false);
    }
    useEffect(() => {
        if (typeData === "binding") {
            binding(true)
        }
    }, [setIsOpen])
    return (
        <div className="custom-select-wrapper " style={{marginBottom: mb}}>
            <div className="selectCustom text__content__black__12" style={{width: width}} onClick={toggling}>
                {selectedOption || placeholder}
                <span className={isOpen ? 'iconDate' : "iconBtn"}>
                    <Icon24ChevronDown color={GREY}/>
                </span>
            </div>
            {isOpen && (
                <div className="custom-select-list text__content__black__12">
                    {options.map((option, index) =>
                        <div onClick={onOptionClicked(option)} key={index} className="custom-select-item">
                            {option.name}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default CustomSelect;


