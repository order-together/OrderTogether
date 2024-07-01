import './JointOrder.css'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material'
import Button from '@mui/material/Button'

export const JointOrder = () => {

  const [product, setProduct] = useState({})
  const [feedback, setFeedback] = useState({ open: false, message: '', severity: '' });
  const { uid } = useParams()

  const handleClose = () => {
    setFeedback({ ...feedback, open: false });
  };

  const handleClickPay = () =>{
    axios.put(`http://localhost:8000/product/productsUpdateCurrentQuantity/${uid}`)
      .then(response => {
        setFeedback({ open: true, message: 'Thank you for your payment!', severity: 'success' });
      })
      .catch(error => {
        setFeedback({ open: true, message: `Error: ${error.message}`, severity: 'error' });
      })
  }

  useEffect(() => {
    axios.get(`http://localhost:8000/product/products/${uid}`)
      .then(response => {
        setProduct(response.data)
      })
      .catch(error => {
        console.error('There was an error fetching the products!', error)
      })
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
          <div className="product-rating">
            {Array.from({ length: product.rating }, () => '⭐').join('')}
            <p>{product.initiator}</p>
          </div>
        </div>
        <div className="product-details-middle">
          <div className="product-details-middle-left">
            <p><span>${product.unitPrice} </span> / unit</p>
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
