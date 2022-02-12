import ReactDom from 'react-dom'
import {App} from './App/App'
import {Provider} from 'react-redux'
import {store} from './dal/store'
import React from 'react'
import {BrowserRouter} from 'react-router-dom'
import {RoutesComponent} from "./components/RoutesComponent";

ReactDom.render(
    <React.StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <RoutesComponent/>
            </Provider>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
)

// @ts-ignore
window.store = store
