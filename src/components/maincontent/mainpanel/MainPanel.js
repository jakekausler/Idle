import React from 'react'
import PropTypes from 'prop-types'

import WorldPanelContainer from '../../../containers/WorldPanelContainer'
import ProductionPanelContainer from '../../../containers/ProductionPanelContainer'
import ScorePanelContainer from '../../../containers/ScorePanelContainer'

const MainPanel = ({page}) => (
	<div
		style={{
			height: 'calc(100vh - 100px - 20px - 250px)',
			overflow: "auto",
			flexGrow: 1,
			padding: '4px'
		}}
	>
		{page.text === 'World' && <WorldPanelContainer />}
		{page.text === 'Production' && <ProductionPanelContainer />}
		{page.text === 'Score' && <ScorePanelContainer />}
	</div>
)

MainPanel.propTypes = {
	page: PropTypes.shape({
		id: PropTypes.number.isRequired,
		text: PropTypes.string.isRequired,
		selected: PropTypes.bool.isRequired
	}).isRequired
}

export default MainPanel