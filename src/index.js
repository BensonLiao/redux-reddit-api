import 'babel-polyfill' //For browser compatibility to ES6 Promise mechanism
import React from 'react'
import { render } from 'react-dom'
import Root from './containers/Root'

render(<Root />, document.getElementById('root'))
