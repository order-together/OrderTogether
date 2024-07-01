import './JointOrder.css'
import React, { useEffect, useState } from 'react'
import axios from 'axios'

export const JointOrder = () => {
  // const [product] = useState({
  //   name: 'Used T1100 GPU',
  //   initiator: 'PC-Monster',
  //   remainingQuantity: 6,
  //   unitPrice: 379.99,
  //   postageShare: 23.99,
  //   jointOrderTotal: 403.98,
  //   description: 'This is the product description area where you can add more details about the product.',
  //   rating: 5,
  //   imgURL: './flash-drive.jpg',
  //   productURL: 'https://www.amazon.ca/hz/mobile/mission?p=u0wf%2FdCwHXHuBRVRQU9tOLudhiSwFyyFl405JB9XhUQ%2B384qz53vL2BViDAR0YWpxe7l7LttFtYKvM33kTC%2B8zW%2BNEMGzu%2B7F00krav%2FoXU3LMBWnC%2FluxhypfzrjcyxI0ljKuug3s2smsXsByCVXmM93eo8kJ%2BYjzVcHOvERtP3X8rEJHd64ZWhqfPcK1e4K4Ywj2xuMkyGkJUYE8UILyrFapwl%2BdAidd4Dawb46I7hb3otZF2%2BDGnYwC6L0EQqovr73YHjdirOkzpVGbMyTTIn0hfCfrEGDC4a6jwu%2BPx%2FvOPboD4vuxKW%2BpxgPdGDvERSRPFTbowTPu6e2nPi%2B07uCzvEOS95Zb0I%2FB7sENrIrSwDcj0tsIrPbpR8cw3vy1R0xByv2gtwW98uRLqvZr3fxzqC5rm5ddp0WgB33lrN9ulNZ0Jf0A%3D%3D&ref_=ci_mcx_mi&pf_rd_r=EMKB6W69FX0FMC1D2QFV&pf_rd_p=db47c1a3-b51d-4f84-8fd2-96ca6c07b213&pd_rd_r=da859e3a-ec22-4e08-ab91-04350fa2ddca&pd_rd_w=bOEdM&pd_rd_wg=ITusC'
  // })

  const [product, setProduct] = useState({});

  useEffect(() => {
    axios.get('http://localhost:8000/product/products/5de44d41f06')
      .then(response => {
        setProduct(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the products!", error);
      });
  }, []);

  return (
    <div className="group-buy-container">
      <div className="product-image-container">
        <img src={product.imgURL} alt="Product" className="product-image"/>
        <a href={product.productURL} className="original-link">Original Product Link:
          <p>{product.productURL}</p>
        </a>
      </div>
      <div className="product-details-container">
        <div className="product-details-top">
          <div className="product-details-top-left">
            <h1>{product.name}</h1>
            <p>Remaining Quantity Needed: {product.remainingQuantity}</p>
          </div>
          <div className="product-rating">
            {Array.from({ length: product.rating }, () => '⭐').join('')}
            <p>{product.initiator}</p>
          </div>
        </div>
        <div className="product-details-middle">
          <div className="product-details-middle-left">
            <p><span>${product.unitPrice} </span> / unit</p>
          </div>
          <div className="product-details-middle-right">
            <p>Postage After Share: <span>${product.postageShare} </span></p>
            <p>Joint Order Total: <span>${product.jointOrderTotal} </span></p>
          </div>
        </div>
        <div className="product-description">{product.description}</div>
        <button>Pay To Join</button>
      </div>
    </div>
  )
}
