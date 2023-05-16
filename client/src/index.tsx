import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {store} from "./store";
import {Provider} from "react-redux";
import {YMaps} from "@pbe/react-yandex-maps";

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
    <Provider store={store}>
        <YMaps query={{apikey: 'a4c86d2b-83a0-4773-a33e-2d464e2ce324', load: "package.full"}}>
            <App/>
        </YMaps>
    </Provider>
);

