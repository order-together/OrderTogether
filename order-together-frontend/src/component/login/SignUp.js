import React, { useState } from 'react'
import * as yup from 'yup'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import { Box, Stack } from '@mui/system'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Checkbox, FormControlLabel, Grid, IconButton, InputAdornment } from '@mui/material'
import GoogleIcon from '@mui/icons-material/Google'

import { signUpRequest, usernameExistedCheck } from '../../action/user/userAction'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { authValidationSchema } from './schemas.js'
import CircularWaiting from '../public/CircularWaiting.js'

const baseURL = process.env.REACT_APP_ServerBaseURL

export const SignUp = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [isSubscribe, setIsSubscribe] = useState(false)
  const [usernameCheckRes, setusernameCheckRes] = useState({})
  const [isCheckingBackEnd, setIsCheckingBackEnd] = useState(false)

  const [validationRes, setValidationRes] = useState({
    isValid: null,
    errs: null
  })

  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })

  const handleInputChange = event => {
    const { name, value } = event.target
    setFormData(state => ({ ...state, [name]: value }))
  }

  const updateValidationResults = (fieldName, errorMsg = null) => {
    setValidationRes(prevState => {
      const newErrs = { ...prevState.errs }
      if (errorMsg) {
        newErrs[fieldName] = errorMsg
      } else {
        delete newErrs[fieldName]
      }
      const isFormValid = Object.keys(newErrs).length === 0
      return {
        isValid: isFormValid,
        errs: newErrs
      }
    })
  }

  const handleOnBlur = async event => {
    const { name, value } = event.target
    try {
      yup.reach(authValidationSchema, name).validateSync(value)
      updateValidationResults(name)
    } catch (error) {
      updateValidationResults(name, error.message)
      return
    }
    if (name === 'username') {
      setIsCheckingBackEnd(true)
      const existRes = await dispatch(usernameExistedCheck(value))
      console.log(`existRes2==>${JSON.stringify(existRes)}`)
      setIsCheckingBackEnd(false)
      setusernameCheckRes({
        username: value,
        existed: existRes.existed,
        message: existRes.message
      })
      if (existRes.error || existRes.existed) {
          updateValidationResults(name, existRes.message)
      } else {
          updateValidationResults(name)
      }
    }
  }

  const handleSubmit = async event => {
    event.preventDefault()
    try {
      authValidationSchema.validateSync(formData, { abortEarly: false })
      if (formData.username !== usernameCheckRes.username) {
        setIsCheckingBackEnd(true)
        const existRes = await dispatch(usernameExistedCheck(formData.username))
        setIsCheckingBackEnd(false)
        if (existRes.error || existRes.existed) {
            setValidationRes(prevState => ({
                ...prevState,
                isValid: false,
                errs: {...prevState.errs, username: existRes.message}
            }))
            return
        }
      }

      setIsCheckingBackEnd(true)
      const results = await dispatch(signUpRequest(formData.username, formData.password))
      setIsCheckingBackEnd(false)

      if (results.signUp) {
        localStorage.setItem('signupusername', formData.username)
        navigate('/confirm-username')
      } else {
        setValidationRes(prevState => ({
          ...prevState,
          isValid: false,
          errs: { ...prevState.errs, form: results.message }
        }))
      }
    } catch (err) {
      const validationErrs = err.inner.reduce(
        (acc, currentErr) => ({
          ...acc,
          [currentErr.path]: currentErr.message
        }),
        {}
      )
      setValidationRes({ isValid: false, errs: validationErrs })
    }
  }

  return (
    <Box
      sx={{
        height: 'auto',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        paddingTop: 0,
        paddingBottom: 0,
        background: 'rgba(240, 240, 240, 1)',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          zIndex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column'
        }}
      >
        <Container
          maxWidth="md"
          sx={{
            top: { md: '80px' },
            position: 'absolute',
            backgroundColor: 'white',
            borderRadius: '8px',
            paddingLeft: '16px !important',
            paddingRight: '16px !important',
            width: { md: '466px' },
            height: { xs: '932px', md: '380px' }
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              '& img': {
                display: { xs: 'block', md: 'none' },
                position: 'absolute',
                width: '150px',
                top: '30px',
                filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))'
              }
            }}
          >
          </Box>

          <Typography
            sx={{
              mt: { xs: '220px', md: '15px' },
              width: { md: '434px' },
              height: '30px',
              fontFamily: 'sans-serif',
              fontStyle: 'normal',
              fontWeight: 500,
              fontSize: '20px',
              lineHeight: '150%',
              color: '#0769DA'
            }}
          >
            Sign up
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1, width: '100%' }} onSubmit={handleSubmit}>
            <Box>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                value={formData.username}
                onChange={handleInputChange}
                onBlur={handleOnBlur}
                error={validationRes.errs?.username}
                helperText={validationRes.errs?.username}
                InputProps={{
                  endAdornment: isCheckingBackEnd && <CircularWaiting size={20}/>
                }}
                sx={{
                  '.MuiOutlinedInput-root': {
                    bgcolor: '#F9FAFB',
                    borderRadius: '8px',
                    '&:hover fieldset': {
                      borderColor: '#0769DA'
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#0769DA'
                    }
                  },
                  '& .MuiOutlinedInput-input': {
                    pt: '12px',
                    pb: '12px',
                    fontFamily: "'Inter', sans-serif'",
                    fontSize: '14px',
                    lineHeight: '125%'
                  },
                  '& .MuiInputLabel-outlined': {
                    transform: 'translate(14px, 13px) scale(0.9)',
                    color: '#6B7280',
                    fontFamily: "'Inter', sans-serif'",
                    '&.Mui-focused': {
                      color: '#0769DA'
                    }
                  }
                }}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type={showPassword ? 'text' : 'password'}
                id="password"
                autoComplete="current-password"
                value={formData.password}
                onChange={handleInputChange}
                onBlur={handleOnBlur}
                error={validationRes.errs?.password}
                helperText={validationRes.errs?.password}
                InputProps={{
                  endAdornment: (
                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? (
                        <Visibility sx={{ height: '20px', width: '20px' }}/>
                      ) : (
                        <VisibilityOff sx={{ height: '20px', width: '20px' }}/>
                      )}
                    </IconButton>
                  )
                }}
                sx={{
                  '.MuiOutlinedInput-root': {
                    bgcolor: '#F9FAFB',
                    borderRadius: '8px',
                    '&:hover fieldset': {
                      borderColor: '#0769DA'
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#0769DA'
                    }
                  },
                  '& .MuiOutlinedInput-input': {
                    pt: '12px',
                    pb: '12px',
                    fontFamily: '\'Inter\', sans-serif',
                    fontSize: '14px',
                    lineHeight: '125%'
                  },
                  '& .MuiInputLabel-outlined.MuiInputLabel-shrink': {
                    transform: 'translate(14px, -9px) scale(0.75)',
                    fontFamily: '\'Inter\', sans-serif'
                  },
                  '& .MuiInputLabel-outlined': {
                    transform: 'translate(14px, 13px) scale(0.9)',
                    color: '#6B7280',
                    fontFamily: '\'Inter\', sans-serif',
                    '&.Mui-focused': {
                      color: '#0769DA'
                    }
                  }
                }}
              />
              <Typography
                sx={{
                  mb: '24px',
                  fontFamily: '\'Inter\', sans-serif',
                  fontSize: '14px',
                  color: 'gray'
                }}
              >
                We'll never share your details. See our
                <button
                  style={{
                    fontFamily: '\'Inter\', sans-serif',
                    backgroundColor: '#fff',
                    color: '#1C64F2',
                    position: 'relative',
                    left: '4px',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  Privacy Terms.
                </button>
              </Typography>
            </Box>
            <Box
              sx={{
                width: { md: '434px' },
                height: '135px',
                mt: '24px'
              }}
            >
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  fontFamily: '\'Inter\', sans-serif',
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '41px',
                  textTransform: 'none',
                  mt: 3,
                  mb: 2,
                  padding: '10px 20px',
                  gap: '8px',
                  backgroundColor: validationRes.isValid && isSubscribe ? '#0769DA' : 'lightgray',
                  ':hover': {
                    bgcolor: '#0769DA',
                    color: 'white'
                  }
                }}
                disabled={!validationRes.isValid || isCheckingBackEnd}
              >
                {isCheckingBackEnd ? <CircularWaiting size={20}/> : 'Sign Up'}
              </Button>
            </Box>
            <Box sx={{ display: 'flex', mt: '-40px', fontFamily: '\'Inter\', sans-serif' }}>
              <Typography>Already have an account?</Typography>
              <Typography sx={{ ml: '8px' }}>
                <Link
                  to="/login"
                  style={{
                    textDecoration: 'none',
                    color: '#1C64F2',
                    fontFamily: '\'Inter\', sans-serif'
                  }}
                >
                  Log in
                </Link>
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  )
}
