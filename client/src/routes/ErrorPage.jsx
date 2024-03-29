import {GREY_BLACK, WHITE} from "../theme/colors";

export const ErrorPage = () => {
    return (
        <div
             style={{
                 display: "flex",
                 justifyContent: "center",
                 alignItems: "center",
                 height: "100vh",
                 background: "radial-gradient(circle, rgba(252,252,252,1) 0%, rgba(206,205,209,1) 50%, rgba(178,179,175,1) 100%)",
        }}>
                <div className="column__c__c" >
                    <h1 style={{
                        color: GREY_BLACK,
                        marginTop: "20px",
                        fontWeight: "bold",
                        fontSize: "15vw",
                        height: "150px",
                        textAlign: "center",
                        textShadow:" 0px 0px 3px var(--grey-black)"
                    }}>404</h1>
                    <h5 className="text__content__grey__16">Страница не найдена</h5>
                    <a
                        href={"/"}
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            background: GREY_BLACK,
                            width: "250px",
                            height: "30px",
                            padding: "5px",
                            borderRadius: "5px",
                            color: WHITE,
                            marginTop: "10px"
                        }}
                    >
                        <span>Перейти на главную</span>
                    </a>
                </div>

        </div>
    )
}