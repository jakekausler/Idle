import { connect } from 'react-redux'
import { changePage } from '../actions/actions'

import ProductionPanel from '../components/maincontent/mainpanel/productionpanel/ProductionPanel'

const mapStateToProps = state => {
	return {
		productionInfo: state.productionInfo
	}
}

const mapDispatchToProps = dispatch => {
	return {}
}

const ProductionPanelContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(ProductionPanel)

export default ProductionPanelContainer