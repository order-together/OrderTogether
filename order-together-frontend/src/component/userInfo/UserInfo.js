import React, { useEffect, useState } from 'react'
import './styles.css'
import { useLocation, useNavigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import axios from 'axios'
import { Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material'
import Button from '@mui/material/Button'
import LogoutIcon from '@mui/icons-material/Logout';

export const UserInfo = () => {
  const navigate = useNavigate()
  const decoded = jwtDecode(localStorage.getItem('userToken'))
  const userUId = decoded.userUId
  const [feedback, setFeedback] = useState({ open: false, message: '', severity: '' })
  const [formData, setFormData] = useState({
    userId: userUId,
  })
  const [userInfo, setUserInfo] = useState('')


  const getUserInfo = () => {
    axios.get(`http://localhost:8000/user/userInfo/${userUId}`)
      .then(response => {
        setUserInfo(response.data)
      })
      .catch(error => {
        console.error('There was an error fetching the user!', error)
      })
  }
  const handleClickNav = () => {
    navigate(`/rating/${userUId}`)
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleLogout = ()=>{
    localStorage.setItem('userToken','')
    navigate('/login')
  }

  const handleSave = () => {
    console.log(`formdata==>${JSON.stringify(formData)}`)
    axios.put(`http://localhost:8000/user/update`, formData)
      .then(response => {
        setFeedback({ open: true, message: 'Your user file has been saved!', severity: 'success' })
      })
      .catch(error => {
        setFeedback({ open: true, message: `Error: ${error.message}`, severity: 'error' })
      })
  }

  const handleClose = () => {
    setFeedback({ ...feedback, open: false })
  }

  useEffect(() => {
    getUserInfo()
  }, [])

  return (
    <div class="form-container">
      <LogoutIcon
        sx={{position:'absolute',right:'23px',top:'90px',cursor:'pointer'}}
        onClick={handleLogout}
      />
      <form>
        <div class="form-group">
          <label for="first-name" class="label">Name</label>
          <input type="text" id="first-name" placeholder={userInfo.firstName ? userInfo.firstName : "First Name *" } class="input-field" name="firstName"
                 onChange={handleChange}/>
          <input type="text" id="last-name" placeholder={userInfo.lastName ? userInfo.lastName : "Last Name *" } class="input-field" name="lastName"
                 onChange={handleChange}/>
        </div>
        <div class="form-group">
          <label for="age" class="label">Age</label>
          <input type="text" id="age" placeholder={userInfo.age ? userInfo.age : "Age number *" }  class="input-field" name="age"
                 onChange={handleChange}/>
        </div>
        <div class="form-group">
          <label for="phone" class="label">Phone</label>
          <input type="text" id="phone" placeholder={userInfo.phone ? userInfo.phone : "Phone Number *" }  class="input-field" name="phone"
                 onChange={handleChange}/>
        </div>
        <div class="form-group">
          <label for="address" class="label">Address</label>
          <input type="text" id="street" placeholder={userInfo.street ? userInfo.street : "Street *" }  class="input-field" name="street"
                 onChange={handleChange}/>
          <input type="text" id="city" placeholder={userInfo.city ? userInfo.city : "City *" }  class="input-field" name="city" onChange={handleChange}/>
        </div>
        <div class="form-group">
          <label for="postal-code" class="label">Postal Code</label>
          <input type="text" id="postal-code" placeholder={userInfo.postcode ? userInfo.postcode : "Postal Code *" }  class="input-field" name="postcode"
                 onChange={handleChange}/>
        </div>
        <button  class="save-button" type="button"
                onClick={handleSave}
        >Save</button>
      </form>
      <div class="direction-button">
        <button onClick={handleClickNav}>&#x279C;</button>
      </div>
      <Dialog open={feedback.open} onClose={handleClose}>
        <DialogTitle>{feedback.severity === 'success' ? 'Success' : 'Error'}</DialogTitle>
        <DialogContent>
          <Typography>{feedback.message}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
