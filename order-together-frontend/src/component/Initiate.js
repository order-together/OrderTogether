import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { Link } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Dialog,DialogTitle,DialogContent,Typography,DialogActions } from '@mui/material'

export const Initiate = () => {
  const decoded = jwtDecode(localStorage.getItem('userToken'))
  const userUId = decoded.userUId
  const [feedback, setFeedback] = useState({ open: false, message: '', severity: '' });
  const boxStyle = { marginBottom: '30px' }
  const textFieldStyle = {
    '& .MuiOutlinedInput-root': {
      marginTop: '5px',
      '& .MuiInputBase-input': {
        height: '20px',
        padding: '10px',
      },
    },
  }

  const imgURLTextFieldStyle = {
    '& .MuiOutlinedInput-root': {
      marginTop: '5px',
      width: '350px',
      '& .MuiInputBase-input': {
        height: '20px',
        padding: '10px',
      },
    },
  }

  const desTextFieldStyle = {
    '& .MuiOutlinedInput-root': {
      marginTop: '5px',
      height: '180px',
      overflow: 'auto',
      '& .MuiInputBase-input': {
        width: '320px',
        height: '180px',

      },
    },
  }

  const productLinkTextFieldStyle = {
    '& .MuiOutlinedInput-root': {
      marginTop: '5px',
      overflow: 'auto',
      '& .MuiInputBase-input': {
        height: '60px',
        width: '320px',
      },
    },
  }

  const [formData, setFormData] = useState({
    creator: '30cedd086b1',
  })

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleClose = () => {
    setFeedback({ ...feedback, open: false });
  };

  const handleSubmit = () => {
    axios.post('http://localhost:8000/product/initiate', formData)
      .then(response => {
        setFeedback({ open: true, message: 'Success: Product initiated successfully!', severity: 'success' });
      })
      .catch(error => {
        setFeedback({ open: true, message: `Error: ${error.message}`, severity: 'error' });
      })
  }

  const [imageUrl, setImageUrl] = useState('')
  const [displayedImage, setDisplayedImage] = useState(null)

  const handleImageUrlChange = (event) => {
    setImageUrl(event.target.value)
    const { name, value } = event.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleDisplayImage = () => {
    setDisplayedImage(imageUrl)
  }

  return (
    <Box sx={{ display: 'flex', direction: 'row', justifyContent: 'center', marginTop: '50px' }}>
      <Box sx={{ paddingRight: '50px', width: '350px' }}>
        <Box
          sx={{ paddingRight: '50px', textAlign: 'center', display: 'flex', flexDirection: 'column' }}>
          {displayedImage ? (
            <img src={displayedImage} style={{ width: '350px', height: 'auto' }} alt="Uploaded"/>
          ) : (
            <Box
              sx={{
                width: '350px',
                height: '300px',
                border: '2px dashed #ccc',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              No image to display
            </Box>
          )}
          <Box sx={{ marginTop: '30px', display: 'flex' }}>Image Link</Box>
          <TextField
            variant="outlined"
            placeholder="Enter image URL"
            value={imageUrl}
            name="imgURL"
            onChange={handleImageUrlChange}
            sx={imgURLTextFieldStyle}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleDisplayImage}
            sx={{ marginTop: '10px', width: '350px' }}
          >
            Display Image
          </Button>
        </Box>
        <Box sx={{ marginTop: '30px' }}>Original Product Link</Box>
        <TextField
          abel="Enter Text"
          // value={value}
          name="productURL"
          onChange={handleChange}
          sx={productLinkTextFieldStyle}
          multiline
        >
        </TextField>
      </Box>
      <Box>
        <Box sx={boxStyle}>
          <Box>Product Name</Box>
          <TextField
            abel="Enter Text"
            variant="outlined"
            // value={value}
            name="name"
            onChange={handleChange}
            fullWidth
            sx={textFieldStyle}
          >
          </TextField>
        </Box>
        <Box sx={{ display: 'flex' }}>
          <Box sx={{ marginBottom: '30px', marginRight: '30px' }}>
            <Box>Price Per Unit</Box>
            <TextField
              abel="Enter Text"
              variant="outlined"
              // value={value}
              name="unitPrice"
              onChange={handleChange}
              fullWidth
              sx={textFieldStyle}
            >
            </TextField>
          </Box>
          <Box sx={boxStyle}>
            <Box>Total Quantity</Box>
            <TextField
              abel="Enter Text"
              variant="outlined"
              // value={value}
              name="targetQuantity"
              onChange={handleChange}
              fullWidth
              sx={textFieldStyle}
            >
            </TextField>
          </Box>
        </Box>
        <Box sx={boxStyle}>
          <Box>Postage in Total</Box>
          <TextField
            abel="Enter Text"
            variant="outlined"
            // value={value}
            name="totalPostage"
            onChange={handleChange}
            fullWidth
            sx={textFieldStyle}
          >
          </TextField>
        </Box>
        <Box sx={boxStyle}>
          <Box>Product Description</Box>
          <TextField
            abel="Enter Text"
            variant="outlined"
            // value={value}
            name="description"
            onChange={handleChange}
            fullWidth
            sx={desTextFieldStyle}
            multiline
          >
          </TextField>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button variant="contained" onClick={handleSubmit}>Save</Button>
        </Box>
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
      </Box>
    </Box>
  )
}