import React from 'react'
import PropTypes from 'prop-types'

import ForceGraph from '../../../common/forcegraph/ForceGraph'

const TechPanel = ({techInfo}) => (
	<div>
		<ForceGraph Graph={techInfo.technologies} />
	</div>
)

TechPanel.propTypes = {
	techInfo: PropTypes.shape({
		technologies: PropTypes.arrayOf(
			PropTypes.shape({
				id: PropTypes.number.isRequired,
				name: PropTypes.string.isRequired,
				requires: PropTypes.arrayOf(
					PropTypes.number
				).isRequired
			})
		).isRequired
	}).isRequired
}

export default TechPanel