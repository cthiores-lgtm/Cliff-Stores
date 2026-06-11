function ProductModal({ product, close }) {
  if (!product) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button
          className="close-btn"
          onClick={close}
        >
          ✖
        </button>

        <img
          src={product.image}
          alt={product.title}
        />

        <h2>{product.title}</h2>

        <p>{product.description}</p>

        <h3>${product.price}</h3>

        <p>
          Category: {product.category}
        </p>

        <p>
          Rating: {product.rating.rate}
        </p>
      </div>
    </div>
  );
}

export default ProductModal;