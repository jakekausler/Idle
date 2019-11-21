import React from 'react'
import PropTypes from 'prop-types'

import './WorldPanel.css'

const WorldPanel = ({worldInfo}) => (
	<div className="WorldPanel">
		<table>
		<tbody>
		{worldInfo.values.map((row, index) => (
			<tr key={index}>
				{row.map(cell => (
					<td
						key={cell.originX + ',' + cell.originY}
						style={{
							background: worldInfo.terrains[cell.terrain],
						}}
						id={'(' + cell.originX + ',' + cell.originY + ')'}
					>
						<div className="Cell">
							{ cell.entities[0].id && <img src={worldInfo.images[cell.entities[0].entityType]} alt={cell.entities[0].entityType}></img> }
							{ cell.entities[1].id && <img src={worldInfo.images[cell.entities[1].entityType]} alt={cell.entities[1].entityType}></img> }
							{ cell.entities[2].id && <img src={worldInfo.images[cell.entities[2].entityType]} alt={cell.entities[2].entityType}></img> }
							{ cell.entities[3].id && <img src={worldInfo.images[cell.entities[3].entityType]} alt={cell.entities[3].entityType}></img> }
							{ cell.entities[4].id && <img src={worldInfo.images[cell.entities[4].entityType]} alt={cell.entities[4].entityType}></img> }
						</div>
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
					originX: PropTypes.number.isRequired,
					originY: PropTypes.number.isRequired,
					entities: PropTypes.arrayOf(
						PropTypes.shape({
							entityType: PropTypes.string.isRequired,
							id: PropTypes.string.isRequired,
						})
					).isRequired,
					terrain: PropTypes.string.isRequired,
				})
			).isRequired,
		).isRequired,
		images: PropTypes.shape({
			HILL: PropTypes.string.isRequired,
			MOUNTAIN: PropTypes.string.isRequired,
			FOREST: PropTypes.string.isRequired,
			RIVER: PropTypes.string.isRequired,
			SETTLEMENT: PropTypes.string.isRequired,
		}).isRequired,
		terrains: PropTypes.shape({
			GRASS: PropTypes.string.isRequired,
			OCEAN: PropTypes.string.isRequired,
			DESERT: PropTypes.string.isRequired,
			SNOW: PropTypes.string.isRequired,
		})
	}).isRequired,
}

export default WorldPanel