const initialState = {
    data: []
  }
  
const attestationReducer = (state = initialState, action) => {
    if (action.type === 'ADD_ATTESTATION')
    {
        return {
        ...state, data: state.data.concat(action.payload)
        }
    }

    if (action.type === 'USER_LOGGED_IN'){
        
    }

    return state
}

export default attestationReducer