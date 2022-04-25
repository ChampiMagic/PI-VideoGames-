const initialState = {
  loading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'LOADINGON':
    return {
      ...state,
      loading: true,
    }
    case 'LOADINGOFF':
    return {
      ...state,
      loading: false,
    }
    default:
     return {...state}


  }
}
