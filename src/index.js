import React from 'react'
import ReactDOM from 'react-dom'
import Cropolis from './Cropolis'

export function create(element, options = {}) {
	return ReactDOM.render(<Cropolis {...options} />, element)
}

export function destroy(element) {
	ReactDOM.unmountComponentAtNode(element)
}

export default Cropolis
