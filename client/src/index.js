import React, {Suspense} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {Provider} from "react-redux";
import store from "./store";
import {ErrorBoundary} from "./components/ErrorBoundary/ErrorBoundary";
import "./firebase"
import {BrowserRouter} from "react-router-dom";
import {Spinner} from "./components/spinner/Spinner";


const App = React.lazy(() => import("./App"));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <ErrorBoundary>
            <Provider store={store}>
                <BrowserRouter>
                    <Suspense fallback={<Spinner/>}>
                        <App/>
                    </Suspense>
                </BrowserRouter>
            </Provider>
        </ErrorBoundary>
    </React.StrictMode>
);
reportWebVitals();
