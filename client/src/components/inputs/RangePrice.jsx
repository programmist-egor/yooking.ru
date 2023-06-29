import {createTheme, Slider, ThemeProvider} from "@mui/material";
import line2 from "../../img/line2.png"
import {useDispatch, useSelector} from "react-redux";
import {rangeValueHandler} from "../../store/Filter";
import {GREY_BLACK} from "../../theme/colors";

const theme = createTheme({
    palette: {
        secondary: {
            main: GREY_BLACK,
        },
    },
});

export const RangePrice = () => {
    const dispatch = useDispatch()
    const rangeValue = useSelector(state => state.filter.rangeValue)

    const handleChange = (event, newValue) => {
        dispatch(rangeValueHandler(newValue))
    };
    const handleChangeStart = (event) => {
        const newArray = rangeValue[0] = event.target.value
        dispatch(rangeValueHandler(newArray))
    }
    const handleChangeEnd = (event) => {
        const newArray = rangeValue[0] = event.target.value
        dispatch(rangeValueHandler(newArray))
    }

    return (
        <>
            <div className="row__sb__c">
                <div className="input__range__block">
                    <input
                        type="number"
                        className="input__range"
                        value={rangeValue[0]}
                        placeholder={"0"}
                        onChange={(event) => handleChangeStart(event)}
                    />
                </div>
                <div
                    className="row__c__c"
                    style={{
                        marginRight: "10px",
                        marginLeft: "10px",
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
                        value={rangeValue[1]}
                        placeholder={"20000+"}
                        onChange={(event) => handleChangeEnd(event)}
                    />
                </div>
            </div>
            <ThemeProvider theme={theme}>
                <Slider
                    value={rangeValue}
                    onChange={handleChange}
                    max={50000}
                    min={0}
                    step={1}
                    color="secondary"
                    // valueLabelDisplay="auto"
                />
            </ThemeProvider>
        </>
    )
}