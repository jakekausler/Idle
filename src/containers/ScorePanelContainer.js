import { connect } from 'react-redux'
import { changePage } from '../actions/actions'

import ScorePanel from '../components/maincontent/mainpanel/scorepanel/ScorePanel'

const mapStateToProps = state => {
	return {
		scoreInfo: state.scoreInfo
	}
}

const mapDispatchToProps = dispatch => {
	return {}
}

const ScorePanelContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(ScorePanel)

export default ScorePanelContainer