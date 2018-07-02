import { CREATE_EVENT } from './actions'

const initialState = []

const createReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_EVENT:
      return state.concat(action.payload)
    default:
      return state
  }
}

export default createReducer