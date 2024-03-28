import { Icon24BrowserBack, Icon24BrowserForward, Icon24RadioOff, Icon24RadioOn } from "@vkontakte/icons";
import { WHITE } from "../../theme/colors";
import { useEffect, useState, useCallback } from "react";
import no_photo from "../../assets/image/no_photo.jpg";
import "./Slider.css";

export const SliderBig = ({ photos, height, maxWidth, borderRadius, minWidth, mb, padding }) => {
    const [count, setCount] = useState(0);
    const [arrayImage, setArrayImage] = useState([]);

    useEffect(() => {
        if (photos) {
            const imageArray = photos.map((item, idx) => ({ img: item.url, id: idx }));
            setArrayImage(imageArray.slice(0, 10));
        }
    }, [photos]);

    const handlerForward = useCallback(() => {
        setCount((prevCount) => (prevCount >= arrayImage.length - 1 ? 0 : prevCount + 1));
    }, [arrayImage]);

    const handlerBack = useCallback(() => {
        setCount((prevCount) => (prevCount <= 0 ? arrayImage.length - 1 : prevCount - 1));
    }, [arrayImage]);

    const currentImage = (photos && photos.length > 0) ? arrayImage[count]?.img : no_photo;

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
                    backgroundImage: `url(${currentImage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    padding: padding,
                }}
            >
                <div className="row__c__fe">
                    <span className="cardControlSlider"></span>
                </div>
                <div className="row__sb__c">
                    <span className="cardControlSlider arrowBtn" onClick={handlerBack}>
                        <Icon24BrowserBack color={WHITE} />
                    </span>
                    <span className="cardControlSlider arrowBtn" onClick={handlerForward}>
                        <Icon24BrowserForward color={WHITE} />
                    </span>
                </div>
                <span className="row__c__c cardControlSlider">
                    {arrayImage.map((_, index) => (
                        <span key={index} style={{ padding: index === count ? "5px" : "2.5px" }}>
                            {index === count ? (
                                <Icon24RadioOn width={9} height={9} color={WHITE} />
                            ) : (
                                <Icon24RadioOff width={9} height={9} color={WHITE} />
                            )}
                        </span>
                    ))}
                </span>
            </div>
            <div className="row__fs__fs" style={{ marginBottom: "40px" }}></div>
        </>
    );
};