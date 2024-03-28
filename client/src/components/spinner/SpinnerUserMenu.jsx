import PulseLoader from "react-spinners/PulseLoader";
import {ORANGE} from "../../theme/colors";

export const SpinnerUserMenu = () => {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "90vh"
            }}
        >
                <PulseLoader
                    color={ORANGE}
                    loading={true}
                    size={10}
                />
        </div>
    )
}