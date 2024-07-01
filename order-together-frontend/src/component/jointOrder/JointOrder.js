import 'JointOrder.css';
import React, { useState } from 'react';

export const JointOrder = () => {
  const [product] = useState({
    name: "Used T1100 GPU",
    remainingQuantity: 6,
    unitPrice: 379.99,
    postageShare: 23.99,
    jointOrderTotal: 403.98,
    rating: 5,
    imgUrl: '/path/to/image.jpg',  // 替换为实际的图片URL
  });

  return (
    <div id="group-buy-container" className="group-buy-container">
      <div className="group-buy-card">
        <div className="group-buy-image">
          <img src={product.imgUrl} alt="Product" />
        </div>
        <div className="group-buy-details">
          <h2>{product.name}</h2>
          <p>Remaining Quantity Needed: {product.remainingQuantity}</p>
          <div className="group-buy-pricing">
            <p>${product.unitPrice} / unit</p>
            <p>Postage After Share: ${product.postageShare}</p>
            <p>Joint Order Total: ${product.jointOrderTotal}</p>
          </div>
          <div className="group-buy-rating">
            {Array.from({ length: product.rating }, () => '⭐').join('')}
          </div>
          <button>Pay To Join</button>
        </div>
      </div>
    </div>
  );
};
