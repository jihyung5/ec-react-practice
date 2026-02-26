function ProductCard({ product }) {
  return (
    <div className="card">
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>¥{product.price.toLocaleString()}</p>
    </div>
  );
}

export default ProductCard;