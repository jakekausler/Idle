import { connect } from 'react-redux'
import { changePage } from '../actions/actions'

import MainPanel from '../components/maincontent/mainpanel/MainPanel'

const mapStateToProps = state => {
	return {
		page: state.pages.filter(page => page.selected)[0]
	}
}

const mapDispatchToProps = dispatch => {
	return {}
}

const MainPanelContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(MainPanel)

export default MainPanelContainer