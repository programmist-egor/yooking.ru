import {BLACK, GREY, GREY_BLACK, WHITE} from "../../theme/colors";
import {
    Icon56WifiOutline,
    Icon24CarOutline,
    Icon24FireAltOutline,
    Icon24SnowflakeOutline,
    Icon28CheckCircleOutline, Icon24Cancel, Icon24ErrorCircleOutline, Icon24BuildingOutline
} from '@vkontakte/icons';
import Drawer from "react-modern-drawer";
import {ButtonIcon} from "../buttons/ButtonIcon";
import React from "react";


export const HotelAmenities = () => {
    const [isOpenBooking, setIsOpenBooking] = React.useState(false)

    const toggleDrawerBooking = () => {
        setIsOpenBooking((prevState) => !prevState)
    }
    const data = [
        {
            id: 0, header: "Ванная комната", options: [
                {id: 0, name: "Туалетная бумага",},
                {id: 1, name: "Полотенца",},
                {id: 2, name: "Ванна или душ",},
                {id: 3, name: "Собственная ванная комната",},
                {id: 4, name: "Ванна дома",},
                {id: 5, name: "Душ",},
            ]
        },
        {
            id: 1, header: "Спальня", options: [
                {id: 0, name: "Белье",},
            ]
        },
        {
            id: 2, header: "Вид", options: [
                {id: 0, name: "Вид на город",},
                {id: 1, name: "Вид на достопримечательность",},
                {id: 2, name: "Вид из окна",},
            ]
        },
        {
            id: 3, header: "Кухня", options: [
                {id: 0, name: "Кухонные принадлежности",},
                {id: 1, name: "Стиральная машина",},
            ]
        },
        {
            id: 4, header: "Удобства в номере", options: [
                {id: 0, name: "Вешалка для одежды",},
            ]
        },
        {
            id: 5, header: "Медиа и технологии", options: [
                {id: 0, name: "Телевизор с плоским экраном",},
                {id: 1, name: "Спутниковое телевиденее",},
                {id: 2, name: "Телевизор",},
            ]
        },
        {
            id: 6, header: "Интернет", options: [
                {id: 0, name: "Бесплатный Wi - Fi на территории отеля",},
            ]
        },
        {
            id: 7, header: "Стойка регистрации", options: [
                {id: 0, name: "Выдаются счета",},
                {id: 1, name: "Индивидуальная регистрация заезда/отъезда",},
                {id: 2, name: "Банкомат на территории отеля",},
                {id: 3, name: "Хранение багажа",},
                {id: 4, name: "Обмен валюты",},
            ]
        },
        {
            id: 8, header: "Парковка", options: [
                {id: 0, name: "Парковочные места рядом с отелем",},
            ]
        },
        {
            id: 9, header: "Услуги уборки", options: [
                {id: 0, name: "Услуги по глажению одежды",},
            ]
        },
        {
            id: 10, header: "Безопасность", options: [
                {id: 0, name: "Огнетушители",},
                {id: 1, name: "Видеонаблюдение снаружи и внутри здания",},
                {id: 2, name: "Датчики дыма",},
                {id: 3, name: "Вход по электронной карте",},
                {id: 4, name: "Вход по ключу",},
                {id: 5, name: "Круглосуточная охрана",},
            ]
        },
        {
            id: 11, header: "Персонал говорит на языках", options: [
                {id: 0, name: "Русский",},
                {id: 1, name: "Английский",},
            ]
        },

    ]
    return (
        <div>
            <div className="column__fs hotel__amenities">
            <span
                className="text__content__black__b__20"
                style={{
                    marginBottom: "15px"
                }}
            >
                Удобства и услуги гостиницы
            </span>
                <div className="row__c__c text__content__black__20" style={{fontWeight: "bold", color: GREY}}>Ничего не
                    найдено
                </div>
                {/*<div className="column__fs">*/}
                {/*    <h4 className="text__content__black__b__16" style={{marginTop: "20px", marginBottom: "10px"}}>*/}
                {/*        Популярные удобства и услуги*/}
                {/*    </h4>*/}
                {/*    <div className="row__sb__c" style={{marginTop: "10px", marginBottom: "40px"}}>*/}
                {/*        <div className="row__c__fs">*/}
                {/*            <Icon56WifiOutline color={BLACK} width={24} height={24}/>*/}
                {/*            <span className="text__content__black__16" style={{marginLeft: "10px"}}>*/}
                {/*                Бесплатный Wi - Fi*/}
                {/*            </span>*/}
                {/*        </div>*/}
                {/*        <div className="row__c__fs">*/}
                {/*            <Icon24CarOutline color={BLACK} width={24} height={24}/>*/}
                {/*            <span className="text__content__black__14" style={{marginLeft: "10px"}}>*/}
                {/*                Трансфер от/до аэрапорта (бесплатный)*/}
                {/*            </span>*/}
                {/*        </div>*/}
                {/*        <div className="row__c__fs">*/}
                {/*            <span className="material-symbols-outlined">*/}
                {/*                smoke_free*/}
                {/*            </span>*/}
                {/*            <span className="text__content__black__14" style={{marginLeft: "10px"}}>*/}
                {/*                Номера для не курящих*/}
                {/*            </span>*/}
                {/*        </div>*/}
                {/*        <div className="row__c__fs">*/}
                {/*            <Icon24FireAltOutline color={BLACK} width={24} height={24}/>*/}
                {/*            <span className="text__content__black__14" style={{marginLeft: "10px"}}>*/}
                {/*                Отопление*/}
                {/*            </span>*/}
                {/*        </div>*/}
                {/*        <div className="row__c__fs">*/}
                {/*            <Icon24SnowflakeOutline color={BLACK} width={24} height={24}/>*/}
                {/*            <span className="text__content__black__14" style={{marginLeft: "10px"}}>*/}
                {/*                Кондиционер*/}
                {/*            </span>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</div>*/}
                {/*<div*/}
                {/*     style={{*/}
                {/*         display: "flex",*/}
                {/*         flexDirection: "column",*/}
                {/*         flexWrap: "wrap",*/}
                {/*         height: "700px",*/}
                {/*         marginTop: "-30px"*/}
                {/*     }}*/}
                {/*>*/}
                {/*    {data.map(item => (*/}
                {/*        <div*/}
                {/*            className="column__fs"*/}
                {/*            style={{*/}
                {/*                marginRight: "20px",*/}
                {/*                width: "33%"*/}
                {/*            }}*/}
                {/*            key={item.id}*/}
                {/*        >*/}
                {/*            <h4 className="text__content__black__b__16">*/}
                {/*                {item.header}*/}
                {/*            </h4>*/}
                {/*            {item.options.map(option => (*/}
                {/*                <div*/}
                {/*                    className="row__c__fs"*/}
                {/*                    style={{*/}
                {/*                        marginTop: "5px",*/}

                {/*                    }}*/}
                {/*                    key={option.id}*/}
                {/*                >*/}
                {/*                    <Icon28CheckCircleOutline color={BLACK} width={24} height={24}/>*/}
                {/*                    <span*/}
                {/*                        className="text__content__black__14"*/}
                {/*                        style={{*/}
                {/*                            marginLeft: "5px",*/}
                {/*                            wordBreak: "break-word"*/}
                {/*                        }}*/}
                {/*                    >*/}
                {/*                    {option.name}*/}
                {/*                </span>*/}
                {/*                </div>*/}
                {/*            ))}*/}
                {/*        </div>*/}
                {/*    ))}*/}
                {/*</div>*/}
            </div>
            <div className="column mobile__quick__booking" style={{marginBottom: "30px"}}>
                <Drawer
                    open={isOpenBooking}
                    onClose={toggleDrawerBooking}
                    direction='bottom'
                    style={{height: "70vh"}}
                >
                    <div className="column" style={{height: "100%", background: WHITE, padding: "20px",}}>
                        <div className="row__sb__c">
                            <h4>Удобства и услуги гостиницы</h4>
                            <span onClick={() => toggleDrawerBooking()}
                                  style={{cursor: "pointer"}}>
                               <Icon24Cancel color={GREY_BLACK}/>
                            </span>
                        </div>

                        <div className="column__fs__c">
                            <div className="row__c__c text__content__black__20" style={{fontWeight: "bold", color: GREY}}>Ничего не
                                найдено
                            </div>
                        </div>
                    </div>
                </Drawer>
                <ButtonIcon
                    handler={() => toggleDrawerBooking()}
                    icon={<Icon24BuildingOutline color={BLACK}/>}
                    style={"bookRulesBtn"}
                    name={"Удобства и услуги в отеле"}
                    styleText={"text__content__black__16"}
                />
            </div>
        </div>
    )
}