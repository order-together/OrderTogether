import {axios} from '../../component/public/const.js'
import {composedAPIs} from '../../component/public/const.js'
export const usernameExistedCheck = username => async dispatch => {
  console.log(`response0000==`)
  try {
    console.log(`response1111==`)
    const response = await axios.get(composedAPIs.checkingUsernameExist, {
      params: {
        username
      }
    })
    console.log(`response2222==`)
    console.log(`response==>${JSON.stringify(response)}`)
    return {existed: response.data.existed, message: response.data.message}
  } catch (error) {
    const message = error.response?.data?.message || 'Network error or no response from server'
    return {error: true, message}
  }
}

export const signUpRequest = (username, password) => async dispatch => {
  try {
    const response = await axios.post(
      composedAPIs.signup,
      {username, password},
      {
        headers: {}
      }
    )
    return {signUp: true, message: response.data.message}
  } catch (error) {
    const message = error.response?.data?.message || 'Network error or no response from server'
    return {signUp: false, message}
  }
}

export const loginSuccess = user => ({
  type: 'LOGIN_SUCCESS',
  payload: user
})

export const loginRequest = (username, password) => async dispatch => {
  try {
    const response = await axios.post(composedAPIs.login, {username, password})

    if (response.data) {
      dispatch(loginSuccess(response.data.user))
      localStorage.setItem('isAuthenticated', true.toString())

      //JWT Authentication
      const token = response.data.token

      return {status: response.status, user: response.data.user, token: token, message: response.message}
    }
  } catch (error) {
    console.error(error)
    return {status: error.response.status, user: null, token: null, message: error.response.data.message}
  }
}