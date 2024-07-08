import * as yup from 'yup'
import {VALIDATION_MESSAGES } from '../public/const.js'

export const authValidationSchema = yup.object({
  username: yup
    .string(VALIDATION_MESSAGES.usernameEnter)
    .required(VALIDATION_MESSAGES.usernameRequired),
  password: yup
    .string(VALIDATION_MESSAGES.passwordEnter)
    .min(8, VALIDATION_MESSAGES.passwordMin)
    .required(VALIDATION_MESSAGES.passwordRequired)
})