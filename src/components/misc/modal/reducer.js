import { LOCATION_CHANGE } from 'react-router-redux'

import { SHOW_MODAL, SHOW_SPINNER, CANCEL_MODAL } from './actions'

const defaultState = {
  spinner: false,
  modalId: null
}

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    // Cancel modal after explicit cancel or any navigation event
    case LOCATION_CHANGE:
    case CANCEL_MODAL:
      return defaultState
    case SHOW_MODAL:
      return {
        spinner: false,
        modalId: action.payload
      }
    case SHOW_SPINNER:
      return {
        spinner: true,
        modalId: null
      }
    default:
      return state
  }
}

export default reducer