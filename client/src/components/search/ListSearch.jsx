
export const ListSearch = ({style, handle, city}) => {

    return (
        <div className={style} >
            <div className="modal__content__list__search">
                <div className="modal__body">
                    <div className="column__fs" style={{marginBottom: "10px"}}>
                        {city.map(item => (
                            <span
                                key={item.id}
                                onClick={() => handle({name: item.fullName, id: item.id, hotelsCount: item.hotelsCount, location: item.location,}, "city")}
                                className="text__content__black__14 list__search"
                            >
                                {item.fullName}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}