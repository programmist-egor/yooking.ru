import one from "../../img/1.png"
import two from "../../img/2.png"
import three from "../../img/3.png"
import four from "../../img/4.png"
import {
    Icon24BrowserBack,
    Icon24BrowserForward,
    Icon24RadioOff,
    Icon24RadioOn
} from "@vkontakte/icons";
import {WHITE} from "../../theme/colors";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import no_photo from "../../img/no_photo.jpg";



export const SliderBig = ({dataHotelNumber, height, maxWidth, borderRadius,minWidth, mb, padding}) => {
    const slideItem = [{id: 0, active: false}]
    const [count, setCount] = useState(0)
    const arrayImage = []
    const imageArray = dataHotelNumber.photos.map(item => item.url)


    if (dataHotelNumber.photos.length < 1) {
        if (slideItem.length < 1) {
            slideItem.push({id: 0, active: true})
        }
    }

    if (dataHotelNumber.photos.length < 10 && dataHotelNumber.photos.length > 1) {
        for (let i = 0; i < dataHotelNumber.photos.length; i++) {
            arrayImage.push({img: imageArray[i], id: i})
        }
        for (let i = 1; i < dataHotelNumber.photos.length; i++) {
            if (slideItem.length <= i) {
                slideItem.push({id: i, active: false})
            }
        }
    }
    if (dataHotelNumber.photos.length > 10) {
        for (let i = 0; i < 10; i++) {
            arrayImage.push({img: imageArray[i], id: i})
        }
        for (let i = 1; i < 10; i++) {
            if (slideItem.length <= i) {
                slideItem.push({id: i, active: false})
            }
        }
    }

    useEffect(() => {
        //preloading image
        arrayImage.forEach((face) => {
            const img = new Image();
            img.src = face;
        });


    }, []);

    slideItem.map(item => {
        if (item.id === count) {
            item.active = true
        }
        return item
    })


    const handlerForward = (i) => {
        if (count >= arrayImage.length - 1 && count <= 10) {
            setCount(0)
        } else {
            setCount(count + i)
        }
    }
    const handlerBack = (i) => {
        if (count <= 0) {
            setCount(arrayImage.length - 1)
        } else {
            setCount(count - i)
        }
    }
    return (
        <>
            <div
                className="column__sb"
                style={{
                    marginBottom: mb,
                    height: height,
                    minWidth: minWidth,
                    maxWidth: maxWidth,
                    borderRadius: borderRadius,
                    backgroundImage: dataHotelNumber.photos.length === 0 ? `url(${no_photo})` : `url(${arrayImage[count].img})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    padding: padding,
                }}
            >
                <div className="row__c__fe">
                <span className="cardControlSlider">

                </span>
                </div>
                <div className="row__sb__c">
                <span
                    className="cardControlSlider arrowBtn"
                    onClick={() => handlerBack(1)}
                >
                    <Icon24BrowserBack color={WHITE}/>
                </span>
                    <span
                        className="cardControlSlider arrowBtn"
                        onClick={() => handlerForward(1)}
                    >
                    <Icon24BrowserForward color={WHITE}/>
                </span>
                </div>

                <span className="row__c__c cardControlSlider">
                {
                    slideItem.map(item => (
                        item.active ?
                            <span
                                key={item.id}
                                style={{
                                    padding: "5px"
                                }}>
                            <Icon24RadioOn
                                width={9}
                                height={9}
                                color={WHITE}
                            />
                        </span>
                            :
                            <span
                                key={item.id}
                                style={{
                                    padding: "2.5px"
                                }}>
                            <Icon24RadioOff
                                width={9}
                                height={9}
                                color={WHITE}
                            />
                        </span>
                    ))}
                </span>
            </div>
            <div
                className="row__fs__fs"
                style={{
                    marginBottom: "40px"
                }}
            >

                {/*{arrayImage.map(photo => (*/}
                {/*    slideItem.map(item => (*/}
                {/*        <img*/}
                {/*            key={photo}*/}
                {/*            src={photo.img}*/}
                {/*            alt={photo}*/}
                {/*            width={200}*/}
                {/*            height={110}*/}
                {/*            style={{*/}
                {/*                borderRadius: "5px",*/}
                {/*                border: item.active ? "1px solid var(--black)" : "",*/}
                {/*                marginRight: "15px",*/}
                {/*                cursor: "pointer"*/}
                {/*            }}*/}
                {/*        />*/}
                {/*    ))*/}
                {/*))}*/}
            </div>
        </>
    )
}