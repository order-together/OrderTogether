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
  emailRequired: 'Email is required',
  emailEnter: 'Enter your email',
  emailValid: 'Enter a valid email',
  passwordEnter: 'Enter your password',
  passwordMin: 'Password should be of minimum 8 characters length',
  passwordRequired: 'Password is required'
}