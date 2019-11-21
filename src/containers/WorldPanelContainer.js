import { connect } from 'react-redux'
import { changePage } from '../actions/actions'

import WorldPanel from '../components/maincontent/mainpanel/worldpanel/WorldPanel'

const mapStateToProps = state => {
	return {
		worldInfo: state.worldInfo
	}
}

const mapDispatchToProps = dispatch => {
	return {}
}

const WorldPanelContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(WorldPanel)

export default WorldPanelContainer