
import '../main.css'
import '@fortawesome/fontawesome-free/css/all.min.css'

export const Header = () => {

  return (
    <div id="header" className="header">
      <img className="logo" src="./logo.png" alt=""/>
      <nav>
        <a href="http://localhost:3000/">PRODUCT</a>
        <a href="#">ORDERS</a>
        <a href="http://localhost:3000/initiate">CREATE</a>
      </nav>
      <div className="right-header">
        <input type="search" placeholder="What are you looking for?"/>
        <div className="icons">
          <i className="fas fa-shopping-cart"></i>
          <i className="fas fa-user"></i>
        </div>
      </div>
    </div>
  )
}
