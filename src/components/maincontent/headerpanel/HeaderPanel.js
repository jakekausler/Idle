import React from 'react';

import PageSelectorContainer from '../../../containers/PageSelectorContainer'

const HeaderPanel = ({pages, onPageClick}) => (
	<div
		style={{
			display: 'flex',
			flexDirection: 'row',
			background: 'var(--color-dark)',
			color: 'var(--color-light)',
			height: '100px'
		}}
	>
		<div
			style={{
				flexGrow: 1,
				padding: '4px'
			}}
		>
			<h1>Idle Game</h1>
		</div>
		<PageSelectorContainer />
	</div>
)

export default HeaderPanel