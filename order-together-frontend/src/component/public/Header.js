
import '../main.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import { useNavigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import { useEffect, useState } from 'react'
export const Header = () => {
  const navigate = useNavigate()
  const [token, setToken] = useState('')

  const handleClickNavUser = () =>{
    if (token === ''){
      navigate('/login')
    }
    else {
      navigate('/userInfo')
    }
  }

  useEffect(() => {
    localStorage.getItem('userToken') && setToken(localStorage.getItem('userToken'))
  }, [])

  return (
    <div id="header" className="header">
      <img className="logo" src="/logo.png" alt=""/>
      <nav>
        <a href="http://localhost:3000/">PRODUCT</a>
        <a href="http://localhost:3000/manage">ORDERS</a>
        <a href="http://localhost:3000/initiate">CREATE</a>
      </nav>
      <div className="right-header">
        <input type="search" placeholder="What are you looking for?"/>
        <div className="icons">
          <i className="fas fa-shopping-cart"></i>
          <i className="fas fa-user" onClick={handleClickNavUser}></i>
        </div>
      </div>
    </div>
  )
}
