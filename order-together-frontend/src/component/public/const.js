import http from 'axios'
export const baseURL = 'http://localhost:8000'

export const composedAPIs = {
  baseURL: baseURL,
  login: `${baseURL}/user/login`,
  signup: `${baseURL}/user/signup`,
  checkingUsernameExist: `${baseURL}/user/check-username-existence`
}
export const axios = http.create({baseURL: composedAPIs.baseURL})
export const VALIDATION_MESSAGES = {
  usernameRequired: 'Username is required',
  usernameEnter: 'Enter your username',
  usernameValid: 'Enter a valid username',
  passwordEnter: 'Enter your password',
  passwordMin: 'Password should be of minimum 8 characters length',
  passwordRequired: 'Password is required'
}