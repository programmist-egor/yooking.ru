import {configureStore} from "@reduxjs/toolkit";
import main from "./Main";
import filter from "./Filter";

export default configureStore( {
    reducer: {
        main: main,
        filter: filter
    }
})
