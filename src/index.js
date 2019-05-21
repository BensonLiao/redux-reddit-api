import 'babel-polyfill' //For browser compatibility to ES6 Promise mechanism
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from './configureStore'
import App from './containers/App'
import rootSaga from './sagas'

const store = configureStore()
store.runSaga(rootSaga)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
