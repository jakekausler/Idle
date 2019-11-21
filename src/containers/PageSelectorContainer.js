import { connect } from 'react-redux'
import { changePage } from '../actions/actions'

import PageSelector from '../components/maincontent/headerpanel/pageselector/PageSelector'

const mapStateToProps = state => {
	return {
		pages: state.pages
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onPageClick: id => {
			dispatch(changePage(id))
		}
	}
}

const PageSelectorContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(PageSelector)

export default PageSelectorContainer