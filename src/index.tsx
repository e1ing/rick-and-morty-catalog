import ReactDom from 'react-dom'
import {Provider} from 'react-redux'
import {store} from './dal/store'
import React from 'react'
import {BrowserRouter, HashRouter} from 'react-router-dom'
import {RoutesComponent} from "./components/RoutesComponent";

ReactDom.render(
    <React.StrictMode>
        <HashRouter basename={process.env.PUBLIC_URL}>
            <Provider store={store}>
                <RoutesComponent/>
            </Provider>
        </HashRouter>
    </React.StrictMode>,
    document.getElementById('root')
)

// @ts-ignore
window.store = store
