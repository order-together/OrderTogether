import * as yup from 'yup'
import {VALIDATION_MESSAGES } from '../public/const.js'

export const authValidationSchema = yup.object({
  username: yup
    .string(VALIDATION_MESSAGES.emailEnter)
    .required(VALIDATION_MESSAGES.emailRequired),
  password: yup
    .string(VALIDATION_MESSAGES.passwordEnter)
    .min(8, VALIDATION_MESSAGES.passwordMin)
    .required(VALIDATION_MESSAGES.passwordRequired)
})