import React, { useEffect, useState } from 'react'
import './UserRating.css'
import { Avatar } from '@mui/material'
import axios from 'axios'
import { formatDistanceToNow } from 'date-fns'
import { useParams } from 'react-router-dom'

export const Rating = () => {
  const [initiatorRatings, setInitiatorRatings] = useState([])
  const [participantRatings, setParticipantRatings] = useState([])
  const [activeFilter, setActiveFilter] = useState('mostRecent')
  const [userInfo, setUserInfo] = useState('')
  const { userUid } = useParams()

  const getUserInfo = () => {
    axios.get(`http://localhost:8000/user/userInfo/${userUid}`)
      .then(response => {
        setUserInfo(response.data)
      })
      .catch(error => {
        console.error('There was an error fetching the user!', error)
      })
  }

  const fetchInitiatorRatings = async (sortBy) => {
    try {
      const response = await axios.get('http://localhost:8000/rate/ratings', {
        params: {
          userId: userUid,
          role: 'initiator',
          sortBy: sortBy
        }
      })
      setInitiatorRatings(response.data)
      console.log(JSON.stringify(response.data))
    } catch (err) {
      console.log(err.message)
    }
  }

  const fetchParticipantRatings = async (sortBy) => {
    try {
      const response = await axios.get('http://localhost:8000/rate/ratings', {
        params: {
          userId: userUid,
          role: 'participant',
          sortBy: sortBy
        }
      })
      setParticipantRatings(response.data)
      console.log(JSON.stringify(response.data))
    } catch (err) {
      console.log(err.message)
    }
  }

  const handleMostRecent = () => {
    setActiveFilter('mostRecent')
    fetchInitiatorRatings('recent')
    fetchParticipantRatings('recent')
  }

  const handleMostFavorable = () => {
    setActiveFilter('mostFavorable')
    fetchInitiatorRatings('favorable')
    fetchParticipantRatings('favorable')
  }

  const handleMostCritical = () => {
    setActiveFilter('mostCritical')
    fetchInitiatorRatings('critical')
    fetchParticipantRatings('critical')
  }

  useEffect(() => {
    fetchInitiatorRatings('recent')
    fetchParticipantRatings('recent')
    getUserInfo()
  }, [])
  return (
    <div className="container">
      <div className="user-info">
        <div className="user-photo">
          <Avatar className="participant-avatar"
                  sx={{ bgcolor: '#b15f45', marginLeft: '30px',marginRight:'30px',width:'80px',height:'80px' }}>{userInfo.username && userInfo.username[0]}</Avatar>
        </div>
        <div className="user-details">
          {/*<p className="user-id">{userInfo.uid}</p>*/}
          <p className="user-name">{userInfo.username}</p>
          <div className="user-rating">
            <div className="rating-stars">
              {Array.from({ length: 5 }, (_, i) => {
                if (i < Math.floor(userInfo.overallRating)) {
                  return <span key={i} className="star filled">★</span>;
                } else if (i < Math.ceil(userInfo.overallRating)) {
                  return <span key={i} className="star half-filled">★</span>;
                } else {
                  return <span key={i} className="star">★</span>;
                }
              })}
            </div>
            <span style={{marginLeft:'5px'}}>{userInfo.overallRating}</span>
          </div>
        </div>
      </div>
      <div className="filters">
        <button className={`filter-button ${activeFilter === 'mostRecent' ? 'active' : ''}`} onClick={handleMostRecent}>Most Recent</button>
        <button className={`filter-button ${activeFilter === 'mostFavorable' ? 'active' : ''}`} onClick={handleMostFavorable}>Most Favorable</button>
        <button className={`filter-button ${activeFilter === 'mostCritical' ? 'active' : ''}`} onClick={handleMostCritical}>Most Critical</button>
      </div>
      <div className="ratings-container">
        <div className="ratings-column">
          <h2>Initiator Rates</h2>
          {initiatorRatings.map(rating => (
            <div className="rating-card">
              <div className="card-header">
                <p className="order-id">{rating.participantOrder.product.uid}</p>
                <p className="timestamp">{formatDistanceToNow(new Date(rating.createdAt), { addSuffix: true })}</p>
              </div>
              <div className="card-body">
                <div className="rating-stars">
                  {Array.from({ length: 5 }, (_, i) => (
                    <span key={i} className={i < rating.rating ? 'star filled' : 'star'}>★</span>
                  ))}
                </div>
                <p className="reviewer">{rating.raterUser.username}</p>
              </div>
              <p className="review-text">{rating.comment}</p>
            </div>
          ))}
        </div>
        <div className="ratings-column">
          <h2>Participant Rates</h2>
          {participantRatings.map(rating => (
            <div className="rating-card">
              <div className="card-header">
                <p className="order-id">{rating.participantOrder.uid}</p>
                <p className="timestamp">{formatDistanceToNow(new Date(rating.createdAt), { addSuffix: true })}</p>
              </div>
              <div className="card-body">
                <div className="rating-stars">
                  {Array.from({ length: 5 }, (_, i) => (
                    <span key={i} className={i < rating.rating ? 'star filled' : 'star'}>★</span>
                  ))}
                </div>
                <p className="reviewer">{rating.raterUser.username}</p>
              </div>
              <p className="review-text">{rating.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
