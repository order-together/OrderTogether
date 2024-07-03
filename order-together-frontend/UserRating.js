import React from 'react';
import './UserRating.css';
//import userIcon from './user-icon.png';

export const UserRatings = () => {
  return (
    <div className="container">
      <div className="user-info">
        <div className="user-photo">
          <img src={userIcon} alt="User Photo" />
        </div>
        <div className="user-details">
          <p className="user-id">12306</p>
          <p className="user-name">David Smith</p>
          <div className="user-rating">
            <span>★★★★☆</span>
            <span>8.0</span>
          </div>
        </div>
      </div>
      <div className="filters">
        <button className="filter-button active">Most Recent</button>
        <button className="filter-button">Most Favorable</button>
        <button className="filter-button">Most Critical</button>
      </div>
      <div className="ratings-container">
        <div className="ratings-column">
          <h2>Initiator Rates</h2>
          <div className="rating-card">
            <div className="card-header">
              <p className="order-id">#12345466</p>
              <p className="timestamp">1d ago</p>
            </div>
            <div className="card-body">
              <div className="rating-stars">★★☆☆☆</div>
              <p className="reviewer">Amy Pond</p>
            </div>
            <p className="review-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
          <div className="rating-card">
            <div className="card-header">
              <p className="order-id">#89166723</p>
              <p className="timestamp">2d ago</p>
            </div>
            <div className="card-body">
              <div className="rating-stars">★★★★☆</div>
              <p className="reviewer">Rory Williams</p>
            </div>
            <p className="review-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
        </div>
        <div className="ratings-column">
          <h2>Participant Rates</h2>
          <div className="rating-card">
            <div className="card-header">
              <p className="order-id">#23454680</p>
              <p className="timestamp">1w ago</p>
            </div>
            <div className="card-body">
              <div className="rating-stars">★★★☆☆</div>
              <p className="reviewer">Me</p>
            </div>
            <p className="review-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
          <div className="rating-card">
            <div className="card-header">
              <p className="order-id">#65742302</p>
              <p className="timestamp">1m ago</p>
            </div>
            <div className="card-body">
              <div className="rating-stars">★★★★★</div>
              <p className="reviewer">Me</p>
            </div>
            <p className="review-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
