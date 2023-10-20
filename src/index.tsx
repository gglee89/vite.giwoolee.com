import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './styles.default.css'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
// Store Setup
import { Provider } from 'react-redux'
import store from './store'

const container = document.getElementById('root')
const root = createRoot(container!)
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
)
