import './ManageOrder.css'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Avatar } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'

export const ManageOrder = () => {
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

  return (
    <div className="order-management">
      <section className="initiator-section">
        <h2>Initiator Orders</h2>
        <div className="order-row">
          {orderData.initiators.map((order) => (
            <div className="initiator-order-card" key={order.id}>
              <button className="delete-order" onClick={() => removeOrder('initiators', order.id)}>×</button>
              <div className="order-header">#{order.id} - {order.name}</div>
              <div className="participants">
                {order.participants.map((participant, index) => (
                  <div key={index} className="participant">
                    <span>{participant.username}</span>
                    <Avatar className="participant-avatar">{participant.username[0]} </Avatar>
                    <button className="participant-delete">×</button>
                    <div className="rating">
                      {Array.from({ length: 5 }, (_, i) => (
                        <span key={i} className={i < participant.rating ? 'star filled' : 'star'}>★</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <button className="start-button">start</button>
            </div>
          ))}
        </div>
      </section>
      <section className="participant-section">
        <h2>Participating Orders</h2>
        <div className="order-row">
          {orderData.participants.map((order) => (
            <div className="participant-order-card" key={order.id}>
              <img className="order-card-img" src="flash-drive.jpg"/>
              <div className="order-card-right">
                <button className="delete-order" onClick={() => removeOrder('participants', order.id)}>×</button>
                <div className="order-info">#{order.id} - {order.name}</div>
                <button className="complete-button">complete</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
