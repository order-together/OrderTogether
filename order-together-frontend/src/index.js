import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { Provider } from 'react-redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import {applyMiddleware, combineReducers, createStore} from 'redux'
import thunk from 'redux-thunk'
import {rootReducers} from './reducer'

const root = ReactDOM.createRoot(document.getElementById('root'))
const reduxStore = createStore(rootReducers, composeWithDevTools(applyMiddleware(thunk)))

root.render(
  <Provider store={reduxStore}>
    <App />
  </Provider>
)


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

reportWebVitals()

