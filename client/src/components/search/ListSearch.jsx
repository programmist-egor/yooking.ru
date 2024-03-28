
export const ListSearch = ({style, handle, city}) => {

    return (
        <div className={style} >
            <div className="modal__content__list__search">
                <div className="modal__body">
                    <div className="column__fs" style={{marginBottom: "10px"}}>
                        {city.map(item => (
                            <span
                                key={item.hotelId}
                                onClick={() => handle("city",{city: item.city, hotelId: item.hotelId, location: item.location})}
                                className="text__content__black__14 list__search"
                            >
                                {item.city}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}