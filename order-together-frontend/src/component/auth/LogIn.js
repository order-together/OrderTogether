import React, {useState, useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {
    TextField,
    Button,
    Typography,
    IconButton,
    Box,
    Snackbar,
    Grid,
    InputAdornment,
    FormControlLabel,
    Checkbox
} from '@mui/material'
import {Visibility, VisibilityOff} from '@mui/icons-material'
import CloseIcon from '@mui/icons-material/Close'
import {Link, useNavigate} from 'react-router-dom'
import GoogleIcon from '@mui/icons-material/Google'
import Container from '@mui/material/Container'
import {jwtDecode} from 'jwt-decode'
import * as yup from 'yup'
import CircularWaiting from '../public/CircularWaiting.js'
import EmailIcon from '@mui/icons-material/Email'
import { REACT_APP_ServerBaseURL } from '../public/const.js'

const baseURL = REACT_APP_ServerBaseURL

export const LogIn = () => {
    const [showPassword, setShowPassword] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [errorMessage, setErrorMessage] = useState('')
    const [openError, setOpenError] = useState(false)
    const [rememberMe, setRememberMe] = useState(false)

    const [isCheckingBackEnd, setIsCheckingBackEnd] = useState(false)
    const [validationRes, setValidationRes] = useState({
        isValid: null,
        errs: null
    })
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return
        }

        setOpenError(false)
        setErrorMessage('')
    }

    const action = (
        <React.Fragment>
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    )

    const handleInputChange = event => {
        const {name, value} = event.target
        setFormData(state => ({...state, [name]: value}))
    }

    const handleOnBlur = event => {
        const {name, value} = event.target
        try {
            // yup.reach(authValidationSchema, name).validateSync(value)
            setValidationRes(prevState => {
                const newErrs = {...prevState.errs}
                delete newErrs[name]
                const isFormValid = Object.keys(newErrs).length === 0
                return {
                    ...prevState,
                    isValid: isFormValid,
                    errs: newErrs
                }
            })
        } catch (error) {
            setValidationRes(prevState => ({
                ...prevState,
                isValid: false,
                errs: {...prevState.errs, [name]: error.message}
            }))
        }
    }

    const handleRememberMe = e => {
        setRememberMe(e.target.checked)
    }

    const handleSubmit = async event => {
        event.preventDefault()
        try {
            // authValidationSchema.validateSync(formData, {abortEarly: false})
            setIsCheckingBackEnd(true)
            // const response = await dispatch(loginRequest(formData.email, formData.password))
            // if (response?.status !== 200) {
            //     setOpenError(true)
            //     setErrorMessage(response.message)
            // } else if (response?.token) {
            //     localStorage.setItem('userToken', response.token)
            //     navigate('/mainpage')
            // } else {
            //     console.error('Login failed: No token received')
            // }
            setIsCheckingBackEnd(false)
        } catch (err) {
            console.error('Login error:', err)
            setIsCheckingBackEnd(false)
        }
    }

    useEffect(() => {
        const token = localStorage.getItem('userToken')
        const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true'
        const isTokenExpired = token => {
            try {
                const decoded = jwtDecode(token)
                const currentTime = Date.now() / 1000
                return decoded.exp < currentTime
            } catch (e) {
                return true
            }
        }
        if (token && isAuthenticated && !isTokenExpired(token)) {
            navigate('/mainpage')
        }
    }, [navigate])

    return (
        <Box
            sx={{
                height: {xs: '934px', md: '708px'},
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                paddingTop: 0,
                paddingBottom: 0,
                color: '#0769DA',
                background: 'rgba(240, 240, 240, 1)'
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
                    sx={{
                        position: 'absolute',
                        top: {md: '80px'},
                        backgroundColor: 'white',
                        paddingLeft: '16px !important',
                        paddingRight: '16px !important',
                        borderRadius: '8px',
                        fontFamily: "'Inter', sans-serif !important",
                        margin: '0',
                        width: {md: '466px'},
                        height: {xs: '932px', md: '520px'}
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            '& img': {
                                display: {xs: 'block', md: 'none'},
                                position: 'absolute',
                                width: '150px',
                                top: '30px',
                                filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))'
                            }
                        }}
                    >
                        <img src="/GIP-logo.png" alt="logo" />
                    </Box>

                    <Box>
                        <Typography
                            sx={{
                                mt: {xs: '268.5px', md: '30px'},
                                width: {md: '434px'},
                                height: {xs: '30px  ', md: '30px'},
                                fontStyle: 'normal',
                                fontWeight: '500',
                                fontSize: '20px',
                                lineHeight: '150%',
                                fontFamily: "'Inter', sans-serif"
                            }}
                        >
                            Log in to Order Together
                        </Typography>

                        <Grid>
                            <Grid item xs={12} md={12}>
                                <Box component="form" noValidate
                                     // onSubmit={handleSubmit}
                                     data-testid="login-form">
                                    <Box>
                                        <TextField
                                            variant="outlined"
                                            margin="normal"
                                            required
                                            fullWidth
                                            id="email"
                                            label="Email Address"
                                            name="email"
                                            autoComplete="email"
                                            // value={formData.email}
                                            // onChange={handleInputChange}
                                            // onBlur={handleOnBlur}
                                            // error={validationRes.errs?.email}
                                            // helperText={validationRes.errs?.email}
                                            sx={{
                                                mt: 3,
                                                '.MuiOutlinedInput-root': {
                                                    bgcolor: '#F9FAFB',
                                                    borderRadius: '8px',
                                                    '& fieldset': {
                                                        borderColor: '#6B7280'
                                                    },
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
                                                    fontFamily: "'Inter', sans-serif",
                                                    fontSize: '14px',
                                                    lineHeight: '125%'
                                                },
                                                '& .MuiInputLabel-outlined': {
                                                    color: '#6B7280',
                                                    fontFamily: "'Inter', sans-serif",
                                                    '&.Mui-focused': {
                                                        color: '#0769DA'
                                                    }
                                                }
                                            }}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <EmailIcon
                                                            sx={{
                                                                fontSize: '20px',
                                                                color: '#6B7280'
                                                            }}
                                                        />
                                                    </InputAdornment>
                                                )
                                            }}
                                            FormHelperTextProps={{
                                                sx: {
                                                    fontFamily: "'Inter', sans-serif"
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
                                            // value={formData.password}
                                            // onChange={handleInputChange}
                                            // onBlur={handleOnBlur}
                                            // error={validationRes.errs?.password}
                                            // helperText={validationRes.errs?.password}
                                            InputProps={{
                                                endAdornment: (
                                                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                                                        {showPassword ? (
                                                            <Visibility sx={{fontSize: '20px', color: '#6B7280'}} />
                                                        ) : (
                                                            <VisibilityOff sx={{fontSize: '20px', color: '#6B7280'}} />
                                                        )}
                                                    </IconButton>
                                                )
                                            }}
                                            sx={{
                                                mb: 2,
                                                mt: {xs: '12px', md: '16px'},
                                                '& .MuiOutlinedInput-root': {
                                                    bgcolor: '#F9FAFB',
                                                    borderRadius: '8px',
                                                    '& fieldset': {
                                                        borderColor: '#6B7280',
                                                        fontFamily: "'Inter', sans-serif"
                                                    },
                                                    '&:hover fieldset': {
                                                        borderColor: '#0769DA'
                                                    },
                                                    '&.Mui-focused fieldset': {
                                                        borderColor: '#0769DA'
                                                    }
                                                },
                                                '.MuiOutlinedInput-input': {
                                                    paddingTop: '12px',
                                                    paddingBottom: '12px',
                                                    fontFamily: "'Inter', sans-serif",
                                                    fontSize: '14px',
                                                    lineHeight: '125%'
                                                },
                                                '& .MuiInputLabel-outlined.MuiInputLabel-shrink': {
                                                    transform: 'translate(14px, -9px) scale(0.75)',
                                                    fontFamily: "'Inter', sans-serif"
                                                },
                                                '& .MuiInputLabel-outlined': {
                                                    transform: 'translate(14px, 13px) scale(0.9)',
                                                    color: '#6B7280',
                                                    fontFamily: "'Inter', sans-serif",
                                                    // display:'none',
                                                    '&.Mui-focused': {
                                                        color: '#0769DA'
                                                    }
                                                }
                                            }}
                                            FormHelperTextProps={{
                                                sx: {
                                                    fontFamily: "'Inter', sans-serif"
                                                }
                                            }}
                                        />
                                    </Box>
                                    <Box
                                        sx={{
                                            mt: '4px',
                                            mb: 0
                                        }}
                                    >
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    sx={{
                                                        color: '#0769DA',
                                                        '&.Mui-checked': {
                                                            color: '#0769DA'
                                                        },
                                                        height: '20px'
                                                    }}
                                                    checked={rememberMe}
                                                    onChange={handleRememberMe}
                                                />
                                            }
                                            label="Remember me"
                                            sx={{
                                                '& .MuiFormControlLabel-label': {
                                                    fontFamily: "'Inter', sans-serif"
                                                }
                                            }}
                                        />
                                    </Box>

                                    <Box
                                        sx={{
                                            width: {md: '434px'},
                                            height: '233px'
                                        }}
                                    >
                                        <Button
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                            sx={{
                                                mt: '24px',
                                                mb: 2,
                                                height: '41px',
                                                background: '#0769DA',
                                                fontFamily: "'Inter', sans-serif",
                                                borderRadius: '8px',
                                                textTransform: 'none',
                                                backgroundColor: validationRes.isValid ? '#0769DA' : '#6B7280',
                                                ':hover': {
                                                    bgcolor: '#0769DA'
                                                },
                                                '& .MuiButton-label': {
                                                    fontStyle: 'normal',
                                                    fontWeight: '500',
                                                    fontSize: '14px',
                                                    lineHeight: '150%'
                                                }
                                            }}
                                            disabled={!validationRes.isValid || isCheckingBackEnd}
                                        >
                                            {isCheckingBackEnd ? <CircularWaiting size={20} /> : 'Log in'}
                                        </Button>
                                        <Box>
                                            <Typography
                                                align={'left'}
                                                sx={{
                                                    mt: 2,
                                                    fontFamily: "'Inter', sans-serif"
                                                }}
                                            >
                                                <Link
                                                    to="/forgot-password"
                                                    style={{textDecoration: 'none', color: '#1C64F2'}}
                                                >
                                                    Forgot Password?
                                                </Link>
                                            </Typography>
                                        </Box>
                                        <Grid item xs={12} md={6}>
                                            <Box sx={{textAlign: 'left', display: 'flex'}}>
                                                <Typography
                                                    sx={{
                                                        mt: 2,
                                                        pr: 1,
                                                        color: '#6B7280',
                                                        fontFamily: "'Inter', sans-serif"
                                                    }}
                                                >
                                                    Not registered?
                                                </Typography>
                                                <Typography sx={{mt: 2}}>
                                                    <Link
                                                        to="/signup"
                                                        style={{
                                                            textDecoration: 'none',
                                                            color: '#1C64F2',
                                                            fontFamily: "'Inter', sans-serif"
                                                        }}
                                                    >
                                                        Create account
                                                    </Link>
                                                </Typography>
                                            </Box>
                                        </Grid>
                                    </Box>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>

                    <Snackbar
                        open={openError}
                        autoHideDuration={6000}
                        onClose={handleClose}
                        message={errorMessage}
                        action={action}
                    />
                </Container>
            </Box>
        </Box>
    )
}
