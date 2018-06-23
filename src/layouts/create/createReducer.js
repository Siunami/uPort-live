import { CREATE_EVENT } from './createActions'

const initialState = []

const createReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_EVENT:
      console.log('Creating event')
      console.log(action.payload)
      return state.concat(action.payload)
    default:
      return state
  }
}

export default createReducer