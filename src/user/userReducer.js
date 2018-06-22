const initialState = {
  data: null,
  attestations: []
}

const userReducer = (state = initialState, action) => {
  if (action.type === 'USER_LOGGED_IN')
  {
    return Object.assign({}, state, {
      data: action.payload
    })
  }

  if (action.type === 'USER_LOGGED_OUT')
  {
    return Object.assign({}, state, {
      data: null
    })
  }

  if (action.type === 'ADD_ATTESTATION')
  {
      console.log(state);
      return {
      ...state, attestations: state.attestations.concat(action.payload)
      }
  }

  if (action.type === 'GET_ATTESTATIONS')
  {
      console.log(state);
      return {
      ...state, attestations: state.attestations.concat(action.payload)
      }
  }

  return state
}

export default userReducer
