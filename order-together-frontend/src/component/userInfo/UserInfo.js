import React from 'react'
import './styles.css'
import { useNavigate } from 'react-router-dom'

export const UserInfo = () => {
  const navigate = useNavigate()
  const handleClickNav = () =>{
    navigate('/rating')
  }
  return (
    <div class="form-container">
      <form>
        <div class="form-group">
          <label for="first-name" class="label">Name</label>
          <input type="text" id="first-name" placeholder="First Name *" class="input-field"/>
          <input type="text" id="last-name" placeholder="Last Name *" class="input-field"/>
        </div>
        <div class="form-group">
          <label for="age" class="label">Age</label>
          <input type="text" id="age" placeholder="Age number *" class="input-field"/>
        </div>
        <div class="form-group">
          <label for="phone" class="label">Phone</label>
          <input type="text" id="phone" placeholder="Phone Number *" class="input-field"/>
        </div>
        <div class="form-group">
          <label for="address" class="label">Address</label>
          <input type="text" id="street" placeholder="Street *" class="input-field"/>
            <input type="text" id="city" placeholder="City *" class="input-field"/>
        </div>
        <div class="form-group">
          <label for="postal-code" class="label">Postal Code</label>
          <input type="text" id="postal-code" placeholder="Postal Code *" class="input-field"/>
        </div>
        <button type="submit" class="save-button" >Save</button>
      </form>
      <div class="direction-button">
        <button onClick={handleClickNav}>&#x279C;</button>
      </div>
    </div>
);
};
