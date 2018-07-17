import React from 'react'
import { connect } from 'react-redux'

import { Modal, MODALS } from '../misc'

import { LoginModal } from '../user'
// import { CheckinModal, VerifyModal } from '../events'

const whichModal = {
  [MODALS.Login]: <LoginModal />,
  // [MODALS.Checkin]: <CheckinModal />,
  // [MODALS.Verify]: <VerifyModal />
}

/**
 * A Wrapper around the application, determining if a modal
 * should be displayed and which one
 */
const ModalWrapper = ({ modalId, spinner, children }) => (
	<React.Fragment>
    {(modalId || spinner) &&
      <Modal spinner={spinner}> 
        {spinner || whichModal[modalId]}
      </Modal>
    }
    {children}
	</React.Fragment>
)

const mapStateToProps = (state, props) => ({
  modalId: state.modal.modalId,
  spinner: state.modal.spinner
})

const mapDispatchToProps = () => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalWrapper)