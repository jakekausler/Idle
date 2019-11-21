import React from 'react';
import PropTypes from 'prop-types'

import './PageButton.css'

const PageButton = ({onClick, selected, text}) => (
	<div className={"PageButton" + (selected ? " selected" : "")} onClick={onClick}>
		<span>{text}</span>
	</div>
)

PageButton.propTypes = {
	onClick: PropTypes.func.isRequired,
	selected: PropTypes.bool.isRequired,
	text: PropTypes.string.isRequired
}

export default PageButton