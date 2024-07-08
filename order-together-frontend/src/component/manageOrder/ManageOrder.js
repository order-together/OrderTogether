import './ManageOrder.css'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Avatar } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import styled from 'styled-components'
import { deepOrange } from '@mui/material/colors'
import { jwtDecode } from 'jwt-decode'

export const ManageOrder = () => {
  const [initiatorOrders, setInitiatorOrders] = useState([])
  const [participantOrders, setParticipantOrders] = useState([])
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

  const clickParticipantButton = (uid, status) => {
    if (status === 'Waiting for participants to complete') {
      axios.put(`http://localhost:8000/order/updateOrderStatus/${uid}`).then(response => {
        window.location.reload()
      })
        .catch(error => {
          console.error('Error updating order status:', error)
        })
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
          rating: order.overallRating
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
        buttonContent:
          data.product.status === 'Waiting for more participants' || data.status === 'Waiting to start'
            ? null
            : (data.product.status === 'Waiting for participants to complete' ? 'complete'
              : (data.product.status === 'Complete' ? 'rate' : null))
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

  const Container = styled.div`
    font-family: Arial, sans-serif;
    background-color: #f8f8f8;
    padding: 20px;
  `

  const Section = styled.div`
    background-color: #fff;
    padding: 20px;
    margin-bottom: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    border: 1px solid #ddd;
  `

  const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  `

  const OrderCard = styled.div`
    background-color: #FAFAFA;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    border: 1px solid #ddd;
  `

  const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  `

  const Users = styled.div`
    display: flex;
    gap: 10px;
    margin-bottom: 10px;
  `

  const User = styled.div`
    text-align: center;
    width: 75px;
    height: 120px;
    position: relative;
  `

  const UserImage = styled.img`
    width: 70px;
    height: 70px;
    border-radius: 50%;
    margin-bottom: 5px;
  `

  const Rating = styled.div`
    font-size: 14px;
    color: #ffa500;
  `

  const Button = styled.button`
    display: block;
    width: 100px;
    padding: 10px;
    font-size: 16px;
    color: #fff;
    background-color: #ffa500;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin: 0 auto;
  `

  const CompleteButton = styled(Button)`
    margin: 0;
  `

  const Popup = styled.div`
    display: ${props => (props.visible ? 'block' : 'none')};
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.4);
    padding-top: 60px;
    box-sizing: border-box;
  `

  const PopupContent = styled.div`
    background-color: #fefefe;
    margin: 5% auto;
    padding: 20px;
    border: 1px solid #888;
    width: 80%;
    max-width: 500px;
    border-radius: 10px;
    position: relative;
    box-sizing: border-box;
  `

  const CloseButton = styled.span`
    color: #999;
    float: right;
    font-size: 28px;
    font-weight: bold;
    cursor: pointer;

    &:hover,
    &:focus {
      color: #000;
      text-decoration: none;
    }
  `

  const Stars = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
  `

  const Star = styled.span`
    font-size: 30px;
    cursor: pointer;
    color: ${props => (props.selected ? '#ffa500' : '#ccc')};

    &:hover,
    &:hover ~ & {
      color: #ffa500;
    }
  `

  const Textarea = styled.textarea`
    width: 100%;
    height: 100px;
    border: 1px solid #ddd;
    border-radius: 5px;
    padding: 10px;
    margin-bottom: 20px;
    font-size: 14px;
    resize: none;
    box-sizing: border-box;
  `

  const [popupVisible, setPopupVisible] = useState(false)
  const [selectedRating, setSelectedRating] = useState(0)
  const [reviewText, setReviewText] = useState('')

  useEffect(() => {
    const highlightStars = (rating) => {
      const stars = document.querySelectorAll('.star')
      stars.forEach(star => {
        if (star.getAttribute('data-rating') <= rating) {
          star.classList.add('selected')
        } else {
          star.classList.remove('selected')
        }
      })
    }

    const stars = document.querySelectorAll('.star')
    stars.forEach(star => {
      star.addEventListener('mouseover', () => {
        const rating = star.getAttribute('data-rating')
        highlightStars(rating)
      })

      star.addEventListener('mouseout', () => {
        highlightStars(selectedRating)
      })

      star.addEventListener('click', () => {
        const rating = star.getAttribute('data-rating')
        setSelectedRating(rating)
        highlightStars(rating)
      })
    })
  }, [selectedRating])

  const handleCompleteClick = () => {
    setPopupVisible(true)
  }

  const handleCloseClick = () => {
    setPopupVisible(false)
  }

  const handleSendReview = () => {
    if (selectedRating && reviewText) {
      alert(`Rating: ${selectedRating} stars\nReview: ${reviewText}`)
      setPopupVisible(false)
      setReviewText('')
      setSelectedRating(0)
    } else {
      alert('Please provide a rating and a review.')
    }
  }

  return (
    <div className="order-management">
      <section className="initiator-section">
        {initiatorOrders.length > 0 && <h2>Initiator Orders</h2>}
        <div className="order-row">
          {initiatorOrders.map((order) => (
            <div className="initiator-order-card" key={order.orderUid}>
              {/*<button className="delete-order" onClick={() => removeOrder('initiatorOrders', order.id)}>×</button>*/}
              <div className="order-header">{order.orderUid} - {order.name}</div>
              <div className="participants">
                {order.participants.map((participant, index) => (
                  <div key={index} className="participant">
                    <span className="participant-title">
                      <span> {`${participant.username}:`}</span>
                      <span className="participant-title-right">{`${participant.quantity}`}</span>
                    </span>
                    <Avatar className="participant-avatar"
                            sx={{ bgcolor: '#b15f45', marginLeft: '17px' }}>{participant.username[0]} </Avatar>
                    <button className="participant-delete"
                            onClick={() => handleDeleteparticipant(participant.orderId)}>×
                    </button>
                    <div className="rating">
                      {Array.from({ length: 5 }, (_, i) => (
                        <span key={i} className={i < participant.rating ? 'star filled' : 'star'}>★</span>
                      ))}
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
        <h2>Participant Orders</h2>
        <div className="order-row">
          {participantOrders.map((order) => (
            <div className="participant-order-card" key={order.orderUid}>
              <img className="order-card-img" src={order.imgURL}/>
              <div className="order-card-right">
                {/*<button className="delete-order" onClick={() => removeOrder('participants', order.id)}>×</button>*/}
                <div className="order-info">{order.orderUid} - {order.name}</div>
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
                  onClick={() => clickParticipantButton(order.orderUid, order.status)}>
                  {order.buttonContent}
                </button>}
              </div>
            </div>
          ))}
        </div>
      </section>
      <Popup visible={popupVisible} onClick={(e) => e.target.id === 'rating-popup' && handleCloseClick()}>
        <PopupContent>
          <CloseButton onClick={handleCloseClick}>&times;</CloseButton>
          <Stars>
            <Star className="star" data-rating="1" selected={selectedRating >= 1}>&#9733;</Star>
            <Star className="star" data-rating="2" selected={selectedRating >= 2}>&#9733;</Star>
            <Star className="star" data-rating="3" selected={selectedRating >= 3}>&#9733;</Star>
            <Star className="star" data-rating="4" selected={selectedRating >= 4}>&#9733;</Star>
            <Star className="star" data-rating="5" selected={selectedRating >= 5}>&#9733;</Star>
          </Stars>
          <Textarea
            id="review-text"
            placeholder="Write your review here..."
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
          />
          <Button id="send-review" onClick={handleSendReview}>Send</Button>
        </PopupContent>
      </Popup>
    </div>
  )
}
