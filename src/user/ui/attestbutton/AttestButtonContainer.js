import { connect } from 'react-redux'
import AttestButton from './AttestButton'
import { attestUser } from './AttestButtonActions'

const mapStateToProps = (state, ownProps) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAttestUserClick: (event) => {
      event.preventDefault();

      dispatch(attestUser())
    }
  }
}

const AttestButtonContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AttestButton)

export default AttestButtonContainer
