

const initialState = {
  user: {
    username: '',
    password: ''
  },
  isAuthenticated: false,
}

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload
      }
  }
}