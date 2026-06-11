import { FaStar } from "react-icons/fa";

function ProductCard({ product, onDetail, onAddCart }) {
  return (
    <div className="card">
      <img src={product.image} alt={product.title} />

      <div className="card-body">
        <h3>{product.title}</h3>

        <div className="rating">
          <FaStar />
          {product.rating.rate}
        </div>

        <h2>${product.price}</h2>

        <div className="actions">
          <button onClick={() => onDetail(product)}>
            Detail
          </button>

          <button
            className="cart-btn"
            onClick={() => onAddCart(product)}
          >
            Add Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;