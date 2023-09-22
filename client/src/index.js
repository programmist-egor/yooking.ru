import React, {Suspense, useEffect, useState} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {Provider, useDispatch} from "react-redux";
import store from "./store";
import {Spinner} from "./components/spinner/Spinner";
import {ErrorBoundary} from "./components/ErrorBoundary/ErrorBoundary";
import "./firebase"
import {StartingPage} from "./routes/StartingPage";





const App = React.lazy(() => import("./App"));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <ErrorBoundary>
            <Provider store={store}>
                <Suspense fallback={<StartingPage/>}>
                    <App/>
                </Suspense>
            </Provider>
        </ErrorBoundary>
    </React.StrictMode>
);
reportWebVitals();
