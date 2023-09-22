import PuffLoader from "react-spinners/PuffLoader";
import {ORANGE} from "../../theme/colors";

export const Spinner = () => {
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
                <PuffLoader
                    color={ORANGE}
                    loading={true}
                    size={70}
                />
        </div>
    )
}