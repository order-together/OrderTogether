import React, { useState } from 'react'
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
  const handleClickNav = () => {
    navigate('/rating')
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleLogout = ()=>{
    localStorage.setItem('userToken',null)
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

  return (
    <div class="form-container">
      <LogoutIcon
        sx={{position:'absolute',right:'23px',top:'90px',cursor:'pointer'}}
        onClick={handleLogout}
      />
      <form>
        <div class="form-group">
          <label for="first-name" class="label">Name</label>
          <input type="text" id="first-name" placeholder="First Name *" class="input-field" name="firstName"
                 onChange={handleChange}/>
          <input type="text" id="last-name" placeholder="Last Name *" class="input-field" name="lastName"
                 onChange={handleChange}/>
        </div>
        <div class="form-group">
          <label for="age" class="label">Age</label>
          <input type="text" id="age" placeholder="Age number *" class="input-field" name="age"
                 onChange={handleChange}/>
        </div>
        <div class="form-group">
          <label for="phone" class="label">Phone</label>
          <input type="text" id="phone" placeholder="Phone Number *" class="input-field" name="phone"
                 onChange={handleChange}/>
        </div>
        <div class="form-group">
          <label for="address" class="label">Address</label>
          <input type="text" id="street" placeholder="Street *" class="input-field" name="street"
                 onChange={handleChange}/>
          <input type="text" id="city" placeholder="City *" class="input-field" name="city" onChange={handleChange}/>
        </div>
        <div class="form-group">
          <label for="postal-code" class="label">Postal Code</label>
          <input type="text" id="postal-code" placeholder="Postal Code *" class="input-field" name="postcode"
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
