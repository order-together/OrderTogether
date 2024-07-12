import React, { useState } from 'react'
import styled from 'styled-components'
import TextField from '@mui/material/TextField'

export const Popup = ()=>{
  const [popupVisible, setPopupVisible] = useState(false)
  const [selectedRating, setSelectedRating] = useState(0)
  const [reviewText, setReviewText] = useState('')
  const [hoverRating, setHoverRating] = useState(0)

  const handleMouseOver = (rating) => {
    setHoverRating(rating)
  }

  const handleMouseOut = () => {
    setHoverRating(0)
  }

  const handleClick = (rating) => {
    setSelectedRating(rating)
  }
  const handleSendReview = () => {
    if (selectedRating && reviewText) {
      setPopupVisible(false)
      setReviewText('')
      setSelectedRating(0)
    } else {
      alert('Please provide a rating and a review.')
    }
  }


  const handleCompleteClick = () => {
    setPopupVisible(true)
  }

  const handleCloseClick = () => {
    setPopupVisible(false)
  }

  const Popup = styled.div`

    //position: fixed;
    //z-index: 1;
    //left: 0;
    //top: 0;
    //width: 100%;
    //height: 100%;
    //overflow: auto;
    //background-color: rgba(0, 0, 0, 0.4);
    //padding-top: 60px;
    //box-sizing: border-box;
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
    color: ${props => (props.selected ? '#ffa500' : 'grey')};
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
  return(
    <Popup>
    {/*//   <PopupContent>*/}
    {/*//     <CloseButton onClick={handleCloseClick}>&times;</CloseButton>*/}
    {/*//     <Stars>*/}
    {/*//       {[1, 2, 3, 4, 5].map(rating => (*/}
    {/*//         <Star*/}
    {/*//           key={rating}*/}
    {/*//           data-rating={rating}*/}
    {/*//           selected={hoverRating >= rating || selectedRating >= rating}*/}
    {/*//           onMouseOver={() => handleMouseOver(rating)}*/}
    {/*//           onMouseOut={handleMouseOut}*/}
    {/*//           onClick={() => handleClick(rating)}*/}
    {/*//         >*/}
    {/*//           &#9733;*/}
    {/*//         </Star>*/}
    {/*//       ))}*/}
    {/*//     </Stars>*/}
      <div>
        <TextField
          id="review-text"
          placeholder="Write your review here..."
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
        />
      </div>
      {/*//   <Button id="send-review" onClick={handleSendReview}>Send</Button>*/}
      {/*// </PopupContent>*/}
    </Popup>

  )
}