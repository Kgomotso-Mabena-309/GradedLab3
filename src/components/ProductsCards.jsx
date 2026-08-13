import React from 'react'

function ProductsCards({ products }) {
  return (
    <div className="products">
      {products.map((product) => (
        <div key={product.id} className="product">
            <img src={product.image} alt={product.title} />
          <h2>{product.title}</h2>
          <p>{product.description}</p>
          <p>Price: ${product.price}</p>
        </div>
      ))}
    </div>
  )
}

export default ProductsCards
