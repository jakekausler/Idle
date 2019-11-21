import { connect } from 'react-redux'

import TechPanel from '../components/maincontent/mainpanel/techpanel/TechPanel'

const mapStateToProps = state => {
	return {
		techInfo: state.techInfo
	}
}

const mapDispatchToProps = dispatch => {
	return {}
}

const TechPanelContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(TechPanel)

export default TechPanelContainer