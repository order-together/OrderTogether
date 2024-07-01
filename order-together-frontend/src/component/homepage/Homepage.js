import '../main.css'
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export const Homepage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/product/products')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the products!", error);
      });
  }, []);

  return (
    <div id="main" className="main">
      <div className="products">
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            <img src={product.imgURL} alt={product.name} />
            <p className="product-name">{product.name}</p>
            <p className="product-price">${product.unitPrice}</p>
            <button>Join Now!</button>
          </div>
        ))}
      </div>
    </div>
  )
}