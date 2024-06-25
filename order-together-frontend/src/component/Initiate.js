import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { Link } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'

export const Initiate = () => {
  const decoded = jwtDecode(localStorage.getItem('userToken'))
  const userUId = decoded.userUId
  const boxStyle = { marginBottom: '30px' }
  const textFieldStyle = {
    '& .MuiOutlinedInput-root': {
      '& .MuiInputBase-input': {
        height: '20px',
        padding: '10px',
      },
    },
  }
  const desTextFieldStyle = {
    '& .MuiOutlinedInput-root': {
      '& .MuiInputBase-input': {
        height: '60px',
        // padding: '5px',
      },
    },
  }
  return (
    <Box sx={{ display: 'flex', direction: 'row', justifyContent: 'center', marginTop: '50px' }}>
      <Box sx={{ paddingRight: '50px' }}>
        <img style={{ width: '300px', height: '300px' }}/>
        <Box sx={{ marginTop:'30px' }}>Original Product Link</Box>
        <TextField
          abel="Enter Text"
          variant="outlined"
          // value={value}
          // onChange={handleChange}
          fullWidth
          sx={desTextFieldStyle}
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
            // onChange={handleChange}
            fullWidth
            sx={textFieldStyle}
          >
          </TextField>
        </Box>
        <Box sx={{display:'flex'}}>
          <Box sx={{marginBottom: '30px',marginRight:'30px'}}>
            <Box>Price Per Unit</Box>
            <TextField
              abel="Enter Text"
              variant="outlined"
              // value={value}
              // onChange={handleChange}
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
              // onChange={handleChange}
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
            // onChange={handleChange}
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
            // onChange={handleChange}
            fullWidth
            sx={desTextFieldStyle}
            multiline
          >
          </TextField>
        </Box>
        <Box  sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button variant="contained">Save</Button>
        </Box>
      </Box>
    </Box>
  )
}