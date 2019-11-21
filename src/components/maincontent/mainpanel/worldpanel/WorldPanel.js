import React from 'react'
import PropTypes from 'prop-types'

import './WorldPanel.css'

const WorldPanel = ({worldInfo}) => (
	<div className="WorldPanel">
		<table>
		<tbody>
		{worldInfo.values.map(row => (
			<tr>
				{row.map(cell => (
					<td
						style={{
							background: cell.color
						}}
						id={'(' + cell.originX + ',' + cell.originY + ')'}
					>
						<div className="Cell"><span>{
							(cell.entities.filter(e => e.entityType === "HILL").length > 0 ? "H" : "") +
							(cell.entities.filter(e => e.entityType === "MOUNTAIN").length > 0 ? "M" : "") +
							(cell.entities.filter(e => e.entityType === "FOREST").length > 0 ? "F" : "") +
							(cell.entities.filter(e => e.entityType === "RIVER").length > 0 ? "R" : "") +
							(cell.entities.filter(e => e.entityType === "SETTLEMENT").length > 0 ? "S" : "")
						}</span></div>
					</td>
				))}
			</tr>
		))}
		</tbody>
		</table>
	</div>
)

WorldPanel.propTypes = {
	worldInfo: PropTypes.shape({
		width: PropTypes.number.isRequired,
		height: PropTypes.number.isRequired,
		currX: PropTypes.number.isRequired,
		currY: PropTypes.number.isRequired,
		values: PropTypes.arrayOf(
			PropTypes.arrayOf(
				PropTypes.shape({
					color: PropTypes.string.isRequired,
					originX: PropTypes.number.isRequired,
					originY: PropTypes.number.isRequired,
					entities: PropTypes.arrayOf(
						PropTypes.shape({
							entityType: PropTypes.string.isRequired,
							id: PropTypes.string.isRequired,
							imageURL: PropTypes.string.isRequired
						})
					).isRequired
				})
			).isRequired
		).isRequired
	}).isRequired
}

export default WorldPanel