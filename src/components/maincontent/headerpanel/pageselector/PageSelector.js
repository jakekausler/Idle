import React from 'react';
import PropTypes from 'prop-types'

import PageButton from './pagebutton/PageButton'

const PageSelector = ({pages, onPageClick}) => (
	<div
		style={{
			width: '400px',
			padding: '4px',
			display: 'flex',
			flexDirection: 'row',
			justifyContent: 'space-between'
		}}
	>
		{pages.map((page, index) => (
			<PageButton key={index} {...page} onClick={() => onPageClick(index)} />
		))}
	</div>
)

PageSelector.propTypes = {
	pages: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.number.isRequired,
			text: PropTypes.string.isRequired,
			selected: PropTypes.bool.isRequired
		})
	).isRequired,
	onPageClick: PropTypes.func.isRequired
}

export default PageSelector