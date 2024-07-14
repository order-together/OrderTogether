import './ManageOrder.css'
import React, { useCallback, useEffect, useState } from 'react'
import axios from 'axios'
import { Avatar, debounce, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import styled from 'styled-components'
import { deepOrange } from '@mui/material/colors'
import { jwtDecode } from 'jwt-decode'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { useNavigate } from 'react-router-dom'

const Star = styled.span`
    font-size: 30px;
    cursor: pointer;
    color: ${props => (props.selected ? '#ffa500' : 'grey')};
    &:hover,
    &:hover ~ & {
      color: #ffa500;
    }
  `
export const ManageOrder = () => {
  const [initiatorOrders, setInitiatorOrders] = useState([])
  const [participantOrders, setParticipantOrders] = useState([])
  const [ratedUid,setRatedUid] = useState('')
  const [participantOrderUid,setParticipantOrderUid]=useState('')
  const [ratingRole,setRatingRole] = useState('')
  const navigate = useNavigate()
  const decoded = jwtDecode(localStorage.getItem('userToken'))
  const userUid = decoded.userUId

  const clickInitiatorButton = (uid, status) => {
    if (status === 'Waiting for more participants') {
      alert('Quantity not met, please waiting for more participants.')
      return
    }
    else if (status === 'Waiting for participants to complete') {
      alert('Please waiting for participants to complete.')
      return
    }

    axios.put(`http://localhost:8000/product/updateProductStatus/${uid}`).then(response => {
      console.log('Product status updated successfully:', response)
      window.location.reload()
    })
      .catch(error => {
        console.error('Error updating product status:', error)
      })
  }

  const clickParticipantButton = (uid, status,rateduid,role) => {
    if (status === 'Waiting for participants to complete') {
      axios.put(`http://localhost:8000/order/updateOrderStatus/${uid}`).then(response => {
        window.location.reload()
      })
        .catch(error => {
          console.error('Error updating order status:', error)
        })
    }
    else if(status === 'Complete'){
      setPopupVisible(true)
      setRatedUid(rateduid)
      setParticipantOrderUid(uid)
      setRatingRole(role)
    }
  }

  const clickParticipantAvatar = (uid, status,rateduid,role) => {
    if(status === 'Complete'){
      setPopupVisible(true)
      setRatedUid(rateduid)
      setParticipantOrderUid(uid)
      setRatingRole(role)
    }else {
      navigate(`/rating/${rateduid}`)
    }
  }

  const fetchInitiatorOrders = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/order/getInitiatorOrders?userUid=${userUid}`, {
        headers: {
          authtoken: localStorage.getItem('userToken')
        }
      })
      const formattedData = response.data.map(data => ({
        orderUid: data.productId,
        name: data.productName,
        status: data.status,
        buttonContent:
          data.status === 'Waiting for more participants' || data.status === 'Waiting to start'
            ? 'start'
            : (data.status === 'Waiting for initiator to complete' ? 'complete' : null)
        ,
        buttonColor:
          data.status === 'Waiting for more participants' || data.status === 'Waiting to start'
            ? '#f2a640'
            : (data.status === 'Waiting for initiator to complete' ? '#4caf50' : null)
        ,
        remainingQuantity: data.remainingQuantity,
        participants: data.orders.map(order => ({
          username: order.username,
          quantity: order.quantity,
          orderId: order.orderId,
          rating: order.overallRating,
          orderUserUid:order.orderUserUid
        }))
      }))
      setInitiatorOrders(formattedData)
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const fetchParticipantOrders = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/order/getParticipantOrders?userUid=${userUid}`, {
        headers: {
          authtoken: localStorage.getItem('userToken')
        }
      })
      const formattedData = response.data.map(data => ({
        orderUid: data.uid,
        name: data.product.name,
        quantity:data.quantity,
        totalPrice:data.totalPrice,
        status: data.product.status,
        imgURL: data.product.imgURL,
        ratedUid:data.product.creator.uid,
        orderStatus:data.status,
        productUid:data.product.uid,
        buttonContent:
          data.product.status === 'Waiting for more participants' || data.status === 'Waiting to start'
            ? null
            : (data.product.status === 'Waiting for participants to complete' ? 'complete'
              : (data.status === 'Rated' ? null
                  :(data.product.status === 'Complete' ? 'rate':null)
              ))
        ,
        buttonColor:
          data.product.status === 'Waiting for more participants' || data.status === 'Waiting to start'
            ? null
            : (data.product.status === 'Waiting for participants to complete' ? '#4caf50'
              : (data.product.status === 'Complete' ? '#f2a640' : null))
      }))
      setParticipantOrders(formattedData)
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const deleteOrder = async (orderId) => {
    try {
      const response = await fetch(`http://localhost:8000/order/deleteOrder/${orderId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const data = await response.json()
      fetchInitiatorOrders()
    } catch (error) {
      console.error('Error deleting order:', error)
    }
  }

  const handleDeleteparticipant = (orderId) => {
    deleteOrder(orderId)
    fetchInitiatorOrders()
  }

  useEffect(() => {
    fetchInitiatorOrders()
    fetchParticipantOrders()
  }, [])

  const fakeData = {
    initiators: [
      {
        id: 1569373, name: 'Order A', participants: [
          { username: 'user1', rating: 3 },
          { username: 'user2', rating: 5 }
        ]
      },
      {
        id: 11122233, name: 'Order B', participants: [
          { username: 'user3', rating: 4 },
          { username: 'user4', rating: 2 },
          { username: 'Iser5', rating: 2 }
        ]
      },

    ],
    participants: [
      { id: 22233344, name: 'Order C', imgURL: 'participant3.png' },
      { id: 90673327, name: 'Order D', imgURL: 'participant3.png' },
      { id: 24583270, name: 'Order E', imgURL: 'participant3.png' }
    ]
  }

  const [orderData, setOrderData] = useState(fakeData)

  const removeOrder = (type, id) => {
    setOrderData(prev => ({
      ...prev,
      [type]: prev[type].filter(order => order.id !== id)
    }))
  }



  const [popupVisible, setPopupVisible] = useState(false)
  const [selectedRating, setSelectedRating] = useState(0)
  const [reviewText, setReviewText] = useState('')
  const [hoverRating, setHoverRating] = useState(0)
  const [feedback, setFeedback] = useState({ open: false, message: '', severity: '' })


  const handleMouseOver = (rating) => {
    setHoverRating(rating)
  }

  const handleMouseOut = () => {
    setHoverRating(0)
  }

  const handleClick = (rating) => {
    setSelectedRating(rating)
  }


  const handleCompleteClick = () => {
    setPopupVisible(true)
  }

  const handleCloseClick = () => {
    setPopupVisible(false)
  }

  const handleSendReview = async(role) => {
    if (selectedRating && reviewText) {
      try {
        const response = await axios.post('http://localhost:8000/rate/ratings',
          {
            raterUid:userUid,
            ratedUid:ratedUid,
            rating:selectedRating,
            comment:reviewText,
            role:role,
            participantOrderUid,
          })
          setFeedback({ open: true, message: 'Successfully submitted！', severity: 'success' })
      } catch (error) {
        setFeedback({ open: true, message: `Error: ${error.message}`, severity: 'error' })
      }
      setPopupVisible(false)
      setReviewText('')
      setSelectedRating(0)
    } else {
      alert('Please provide a rating and a review.')
    }
  }

  const navToSingleProduct = (productUid)=>{
    navigate(`/joint/${productUid}`)
  }

  const handleClose = () => {
    if (feedback.severity === 'success') {
      setFeedback({ ...feedback, open: false })
      fetchParticipantOrders()
      navigate('/manage')
    } else {
      setFeedback({ ...feedback, open: false })
    }
  }

  return (
    <div className="order-management">
      <section className="initiator-section">
        {initiatorOrders.length > 0 ? <h2>Initiator Orders</h2>:<h2>No Initiator Orders</h2>}
        <div className="order-row">
          {initiatorOrders.map((order) => (
            <div className="initiator-order-card" key={order.orderUid}>
              {/*<button className="delete-order" onClick={() => removeOrder('initiatorOrders', order.id)}>×</button>*/}
              <div className="order-header" onClick={()=>navToSingleProduct(order.orderUid)}>{order.orderUid} - {order.name}</div>
              <div className="participants">
                {order.participants.map((participant, index) => (
                  <div key={index} className="participant">
                    <span className="participant-title">
                      <span> {`${participant.username}:`}</span>
                      <span className="participant-title-right">{`${participant.quantity}`}</span>
                    </span>
                    <Avatar className="participant-avatar"
                            sx={{ bgcolor: '#b15f45', marginLeft: '17px',cursor:'pointer'}}
                            onClick={()=>clickParticipantAvatar(participant.orderId,order.status,participant.orderUserUid,'participant')}
                    >{participant.username[0]} </Avatar>
                    <button className="participant-delete"
                            onClick={() => handleDeleteparticipant(participant.orderId)}>×
                    </button>
                    <div className="rating">
                      {Array.from({ length: 5 }, (_, i) => {
                        if (i < Math.floor(participant.rating)) {
                          return <span key={i} className="star filled">★</span>;
                        } else if (i < Math.ceil(participant.rating)) {
                          return <span key={i} className="star half-filled">★</span>;
                        } else {
                          return <span key={i} className="star">★</span>;
                        }
                      })}
                    </div>
                  </div>
                ))}
              </div>
              <div className="initiator-order-card-bottom">
                <div className="initiator-order-card-bottom-left">
                  <span className="remain-quantity">
                    <span className="remain-quantity-quantity">Remaining Quantity: </span>
                    <span className="remain-quantity-content"> {order.remainingQuantity}</span>
                  </span>
                  <span className="initiator-order-card-bottom-status">
                    <span className="order-card-status-status">Status: </span>
                    <span className="order-card-status-content"> {order.status}</span>
                  </span>
                </div>
                {order.buttonContent && <button
                  style={{ backgroundColor: order.buttonColor }}
                  className="start-button"
                  onClick={() => clickInitiatorButton(order.orderUid, order.status)}>
                  {order.buttonContent}
                </button>}
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="participant-section">
        {participantOrders.length > 0 ? <h2>Participant Orders</h2>:<h2>No Participant Orders</h2>}
        <div className="order-row">
          {participantOrders.map((order) => (
            <div className="participant-order-card" key={order.orderUid}>
              <img className="order-card-img" src={order.imgURL}/>
              <div className="order-card-right">
                {/*<button className="delete-order" onClick={() => removeOrder('participants', order.id)}>×</button>*/}
                <div className="order-info" onClick={()=>navToSingleProduct(order.productUid)}>{order.orderUid} - {order.name}</div>
                <span className="participant-order-card-details">
                    <span className="order-card-status-status">Quantity: </span>
                    <span className="order-card-status-content"> {order.quantity}</span>
                  </span>
                <span className="participant-order-card-details">
                    <span className="order-card-status-status">Price: </span>
                    <span className="order-card-status-content"> {order.totalPrice}</span>
                  </span>
                <span className="participant-order-card-details">
                    <span className="order-card-status-status">Status: </span>
                    <span className="order-card-status-content"> {order.status}</span>
                  </span>
                {order.buttonContent && <button
                  style={{ backgroundColor: order.buttonColor }}
                  className="complete-button"
                  onClick={() => clickParticipantButton(order.orderUid, order.status,order.ratedUid,'initiator')}>
                  {order.buttonContent}
                </button>}
              </div>
            </div>
          ))}
        </div>
      </section>
      <div className='popup' style={{ display: popupVisible ? 'block' : 'none' }} onClick={(e) => e.target.id === 'rating-popup' && handleCloseClick()}>
        <div className='popup-content'>
          <button className='closeButton' onClick={handleCloseClick}>&times;</button>
          <div className='stars'>
            {[1, 2, 3, 4, 5].map(rating => (
              <Star
                key={rating}
                data-rating={rating}
                selected={hoverRating >= rating || selectedRating >= rating}
                onMouseOver={() => handleMouseOver(rating)}
                onMouseOut={handleMouseOut}
                onClick={() => handleClick(rating)}
              >
                &#9733;
              </Star>
            ))}
          </div>
          <TextField
            sx={{width:'100%',marginBottom:'20px'}}
            id="review-text"
            placeholder="Write your review here..."
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            multiline
            rows={4}
          />
          {/*<TextField*/}
          {/*  label="Enter Text"*/}
          {/*  variant="outlined"*/}
          {/*  value={reviewText}*/}
          {/*  name="review"*/}
          {/*  onChange={handleChange}*/}
          {/*  fullWidth*/}
          {/*/>*/}
          <button className='button' id="send-review" onClick={()=>handleSendReview(ratingRole)}>Send</button>
        </div>
      </div>
      <Dialog open={feedback.open} onClose={handleClose}>
        <DialogTitle>{feedback.severity === 'success' ? 'Success' : 'Error'}</DialogTitle>
        <DialogContent>
          <Typography sx={{whiteSpace:'pre'}}>{feedback.message}</Typography>
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
