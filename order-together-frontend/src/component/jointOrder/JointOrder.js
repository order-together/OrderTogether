import './JointOrder.css'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { Avatar, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import { jwtDecode } from 'jwt-decode'

export const JointOrder = () => {
  const [product, setProduct] = useState({})
  const [feedback, setFeedback] = useState({ open: false, message: '', severity: '' })
  const [joinQuantity, setJoinQuantity] = useState(0)
  const { uid } = useParams()
  const [error, setError] = useState('')
  const decoded = jwtDecode(localStorage.getItem('userToken'))
  const userUid = decoded.userUId
  const navigate = useNavigate()

  const handleChange = (event) => {
    const { name, value } = event.target
    if (Number(value) > product.remainingQuantity) {
      setError(`Value cannot be greater than ${product.remainingQuantity}`)
      return
    }

    setError('')
    setJoinQuantity(Number(value))

    const postageShare = (product.totalPostage * Number(value) / product.targetQuantity).toFixed(2)
    setProduct(prevProduct => ({
      ...prevProduct,
      postageShare: postageShare,
      jointOrderTotal: (Number(product.unitPrice)*Number(value) + Number(postageShare)).toFixed(2)
    }))
  }

  const getProduct = () => {
    axios.get(`http://localhost:8000/product/products/${uid}`)
      .then(response => {
        setProduct(response.data)
      })
      .catch(error => {
        console.error('There was an error fetching the products!', error)
      })
  }

  const handleClickAvatar = (initiatorUid)=>{
    navigate(`/rating/${initiatorUid}`)
  }

  const handleClose = () => {
    setFeedback({ ...feedback, open: false })
    getProduct()
  }

  const handleClickPay = () => {
    axios.put(`http://localhost:8000/product/makePayment/${uid}`,
      {
        joinQuantity,
        totalPrice: product.jointOrderTotal,
        userUid
      }
    )
      .then(response => {
        setFeedback({ open: true, message: 'Thank you for your payment!', severity: 'success' })
      })
      .catch(error => {
        setFeedback({ open: true, message: `Error: ${error.message}`, severity: 'error' })
      })
  }

  useEffect(() => {
    getProduct()
  }, [])

  return (
    <div className="group-buy-container">
      <div className="product-image-container">
        <img src={product.imgURL} alt="Product" className="product-image"/>
        <a href={product.productURL} className="original-link">Original Product Link:
          <p>{product.productURL}</p>
        </a>
      </div>
      <div className="product-details-container">
        <div className="product-details-top">
          <div className="product-details-top-left">
            <h1>{product.name}</h1>
            <p>Remaining Quantity Needed: {product.remainingQuantity}</p>
          </div>
          <div className="product-rating rating">
            <Avatar className="participant-avatar"
                    sx={{ bgcolor: '#b15f45',cursor:'pointer',display:'flex'}}
                    onClick={()=>handleClickAvatar(product.initiatorUid)}
            >{product.initiator && product.initiator[0]} </Avatar>
            <div>
              {Array.from({ length: 5 }, (_, i) => (
                <span key={i} className={i < product.rating ? 'star filled' : 'star'}>★</span>
              ))}
            </div>
            <p style={{ marginTop: '0px' }}>Initiator:&nbsp;&nbsp;{product.initiator}</p>
          </div>
        </div>
        <div className="product-details-middle">
          <div className="product-details-middle-left">
            <p><span>${product.unitPrice} </span> / unit</p>
            <Box sx={{ marginBottom: '30px' }}>
              <Box>Join Quantity</Box>
              <TextField
                abel="Enter Text"
                variant="outlined"
                defaultValue="1"
                name="joinQuantity"
                onChange={handleChange}
                fullWidth
                // sx={textFieldStyle}
              >
              </TextField>
            </Box>
            {error && <div style={{ color: 'red' }}>{error}</div>}
          </div>
          <div className="product-details-middle-right">
            <p>Postage After Share: <span>${product.postageShare} </span></p>
            <p>Joint Order Total: <span>${product.jointOrderTotal} </span></p>
          </div>
        </div>
        <div className="product-description">{product.description}</div>
        <button className="pay-button" onClick={handleClickPay}>Pay To Join</button>
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
