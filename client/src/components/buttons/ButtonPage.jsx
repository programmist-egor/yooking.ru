import { useDispatch, useSelector } from "react-redux";
import { pageSwitchingHandler } from "../../store/HotelsList";
import { GREY, WHITE } from "../../theme/colors";

export const ButtonPage = () => {
    const dispatch = useDispatch();
    const objectList = useSelector(state => state.hotels_list.objectList);
    const filteredHotels = useSelector(state => state.hotels_list.filteredHotels);
    const itemsPerPage = 5; // Максимальное количество объектов на странице
    const data = filteredHotels ? filteredHotels : objectList;
    const itemPage = useSelector(state => state.hotels_list.itemPage);

    if (data.length === 0) {
        return null; // Возвращаем null, если данных нет
    }

    // Вычисление количества страниц
    const pageCount = Math.ceil(data.length / itemsPerPage);
    const pages = Array.from({ length: pageCount }, (_, index) => index);

    const choosePage = (page) => {
        dispatch(pageSwitchingHandler(page));
    }

    return (
        <div>
            <div className="row__c__c" style={{ display: "flex", marginTop: "20px", marginBottom: "20px" }}>
                {pages.map((page) => (
                    <section
                        key={page}
                        onClick={() => choosePage(page)}
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            flexShrink: 0,
                            width: "35px",
                            height: "35px",
                            borderRadius: "50%",
                            margin: "0 5px",
                            background: (itemPage === page) ? GREY : WHITE,
                            cursor: "pointer"
                        }}
                    >
                        <span className="text__content__black__b__16">{page + 1}</span>
                    </section>
                ))}
            </div>
        </div>
    )
}