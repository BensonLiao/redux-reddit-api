import React, { Component } from 'react'
import { PropTypes } from 'prop-types'

export default class Picker extends Component {
  render() {
    const { value, onChange, options } = this.props
    const datalistId = 'sub-reddit'
    const optionId = 'select-sub-reddit'
    return (
      <span>
        <h1>{value}</h1>
        <label htmlFor={optionId}>Selected sub-reddit: </label>
        <input
          id={optionId}
          type="text"
          list={datalistId}
          onChange={e => onChange(e.target.value)}
          onClick={e => (e.target.value = '')}
        />
        {/* note. datalist are not supported on some browser */}
        {/* ref: https://caniuse.com/#feat=datalist */}
        {/* if in production, it should be handle properly with detect or fallback */}
        <datalist id={datalistId}>
          {options.map(option => (
            <option value={option} key={option}>
              {option}
            </option>
          ))}
        </datalist>
      </span>
    )
  }
}

Picker.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
}
