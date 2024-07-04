import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import userIcon from './assets/user-icon.png';
import productIcon from './assets/product-icon.jpg';

const Container = styled.div`
  font-family: Arial, sans-serif;
  background-color: #f8f8f8;
  padding: 20px;
`;

const Section = styled.div`
  background-color: #fff;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border: 1px solid #ddd;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
`;

const OrderCard = styled.div`
  background-color: #FAFAFA;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border: 1px solid #ddd;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const Users = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
`;

const User = styled.div`
  text-align: center;
  width: 75px;
  height: 120px;
  position: relative;
`;

const UserImage = styled.img`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  margin-bottom: 5px;
`;

const Rating = styled.div`
  font-size: 14px;
  color: #ffa500;
`;

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
`;

const CompleteButton = styled(Button)`
  margin: 0;
`;

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
`;

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
`;

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
`;

const Stars = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const Star = styled.span`
  font-size: 30px;
  cursor: pointer;
  color: ${props => (props.selected ? '#ffa500' : '#ccc')};

  &:hover,
  &:hover ~ & {
    color: #ffa500;
  }
`;

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
`;

export const OrderManagement = () => {
  const [popupVisible, setPopupVisible] = useState(false);
  const [selectedRating, setSelectedRating] = useState(0);
  const [reviewText, setReviewText] = useState("");

  useEffect(() => {
    const highlightStars = (rating) => {
      const stars = document.querySelectorAll('.star');
      stars.forEach(star => {
        if (star.getAttribute('data-rating') <= rating) {
          star.classList.add('selected');
        } else {
          star.classList.remove('selected');
        }
      });
    };

    const stars = document.querySelectorAll('.star');
    stars.forEach(star => {
      star.addEventListener('mouseover', () => {
        const rating = star.getAttribute('data-rating');
        highlightStars(rating);
      });

      star.addEventListener('mouseout', () => {
        highlightStars(selectedRating);
      });

      star.addEventListener('click', () => {
        const rating = star.getAttribute('data-rating');
        setSelectedRating(rating);
        highlightStars(rating);
      });
    });
  }, [selectedRating]);

  const handleCompleteClick = () => {
    setPopupVisible(true);
  };

  const handleCloseClick = () => {
    setPopupVisible(false);
  };

  const handleSendReview = () => {
    if (selectedRating && reviewText) {
      alert(`Rating: ${selectedRating} stars\nReview: ${reviewText}`);
      setPopupVisible(false);
      setReviewText("");
      setSelectedRating(0);
    } else {
      alert('Please provide a rating and a review.');
    }
  };

  return (
    <Container>
      {/* Initiated Orders */}
      <Section>
        <h2>Initiated Orders</h2>
        <Grid>
          <OrderCard>
            <Header>
              <span>#1234567</span>
              <button className="delete-initiated-order-btn">×</button>
            </Header>
            <Users>
              <User>
                <button className="reject-applicant-btn">×</button>
                <UserImage src={userIcon} alt="User Avatar" />
                <Rating>★★★★★</Rating>
              </User>
              <User>
                <button className="reject-applicant-btn">×</button>
                <UserImage src={userIcon} alt="User Avatar" />
                <Rating>★★★☆☆</Rating>
              </User>
              <User>
                <button className="reject-applicant-btn">×</button>
                <UserImage src={userIcon} alt="User Avatar" />
                <Rating>★★★☆☆</Rating>
              </User>
            </Users>
            <Button>Start</Button>
          </OrderCard>
        </Grid>
      </Section>

      {/* Participated Orders */}
      <Section>
        <h2>Participated Orders</h2>
        <Grid>
          <OrderCard>
            <div className="participated-order-content">
              <img src={productIcon} alt="Order Image" className="order-image" />
              <span>#1234567</span>
            </div>
            <CompleteButton onClick={handleCompleteClick}>Complete</CompleteButton>
          </OrderCard>
        </Grid>
      </Section>

      {/* Popup */}
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
    </Container>
  );
};
