import Slider from '@mui/material/Slider';
import {ThemeProvider, createTheme} from '@mui/material/styles';
import line2 from "../../assets/image/line2.png"
import {useDispatch, useSelector} from "react-redux";
import {
    rangeValueEndHandler,
    rangeValueStartHandler
} from "../../store/Filter";
import {GREY_BLACK} from "../../theme/colors";


const theme = createTheme({
    palette: {
        secondary: {
            main: GREY_BLACK,
        },
    },
});

export const RangePrice = ({handlerFocus}) => {
    const dispatch = useDispatch()
    const rangeValueStart = useSelector(state => state.filter.rangeValueStart)
    const rangeValueEnd = useSelector(state => state.filter.rangeValueEnd)



    const handleChange = (event, newValue) => {
        dispatch(rangeValueStartHandler(newValue[0]))
        dispatch(rangeValueEndHandler(newValue[1]))
    };

    const handleChangeStart = (event) => {
        dispatch(rangeValueStartHandler(event.target.value))
    }

    const handleChangeEnd = (event) => {
        dispatch(rangeValueEndHandler(event.target.value))
    }

    return (
        <>
            <div className="row__sb__c">
                <div className="input__range__block">
                    <input
                        type="number"
                        className="input__range"
                        value={rangeValueStart}
                        placeholder={"0"}
                        onBlur={(event) => handlerFocus(event)}
                        onChange={handleChangeStart}
                    />
                </div>
                <div
                    className="row__c__c"
                    style={{
                        marginRight: "5px",
                        marginLeft: "5px",
                        marginBottom: "30px"
                    }}
                >
                    <img
                        src={line2}
                        alt="line2"
                    />
                </div>
                <div className="input__range__block">
                    <input
                        type="number"
                        className="input__range"
                        value={rangeValueEnd}
                        placeholder={"20000+"}
                        onBlur={(event) => handlerFocus(event)}
                        onChange={handleChangeEnd}
                    />
                </div>
            </div>
            <ThemeProvider theme={theme}>
                <Slider
                    value={[rangeValueStart, rangeValueEnd]}
                    onChange={handleChange}
                    onMouseUp={(event) => handlerFocus(event)}
                    max={200000}
                    min={0}
                    step={1}
                    color="secondary"
                />
            </ThemeProvider>
        </>
    )
}