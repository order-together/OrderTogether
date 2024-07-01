import '../main.css'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export const Homepage = () => {
  const navigate = useNavigate()
  const [products, setProducts] = useState([])

  const handleJoinClick = (uid) => {
    navigate(`/joint/${uid}`)
  }

  useEffect(() => {
    axios.get('http://localhost:8000/product/products')
      .then(response => {
        setProducts(response.data)
      })
      .catch(error => {
        console.error('There was an error fetching the products!', error)
      })
  }, [])

  return (
    <div id="main" className="main">
      <div className="products">
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            <img src={product.imgURL} alt={product.name}/>
            <p className="product-name">{product.name}</p>
            <p className="product-price">${product.unitPrice}</p>
            <button className="join-button" onClick={() => handleJoinClick(product.uid)}>Join Now!</button>
          </div>
        ))}
      </div>
    </div>
  )
}