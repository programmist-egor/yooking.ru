import {WHITE} from "../../theme/colors";

export const DescriptionHotel = () => {
    return (
        <div
            className="column__fs"
            style={{
                background: WHITE,
                borderRadius: "20px",
                padding: "20px",
                height: "100%",
                marginBottom: "40px",

            }}
        >
            <span className="text__content__black__b__20" style={{marginBottom: "15px"}}>
                Двухместный номер с 1 кроватью Стандарт 18м2
            </span>
            <span className="text__content__grey__14" style={{marginBottom: "15px"}}>
                2 гостя 1 кровать 1 спальня
            </span>
            <p className="text__content__black__16">
                Уютный номер в теплых тонах для размещения 1 или 2х человек. В номере одна двуспальная кровать либо две
                односпальные кровати.
            </p>
            <p className="text__content__black__16">
                В номере: прикроватные тумбочки, стол, шкаф, вешалка, бра настенные, телевизор.
            </p>
            <p className="text__content__black__16">
                В ванной комнате: душ, туалет, электросушилка настенная, зеркало, комплект гигиенических принадлежностей
                (мыло, гель, шампунь), комплект полотенец на каждого гостя.
            </p>
            <span className="text__content__black__b__16">
                Спальные места: {2}
            </span>
            <p className="text__content__black__16">
                1 двуспальная кровать
            </p>
        </div>
    )
}