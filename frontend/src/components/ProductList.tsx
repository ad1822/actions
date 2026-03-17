import type { Product } from "../types/product"

interface Props {
  products: Product[]
}

export default function ProductList({ products }: Props) {
  return (
    <div className="product-list-container">
      <div className="list-header">
        <h2>📋 Product List</h2>
        <span className="product-count">{products.length} items</span>
      </div>

      {products.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📭</div>
          <h3>No products yet</h3>
          <p>Start by adding your first product using the form on the left</p>
        </div>
      ) : (
        <div className="products-grid">
          {products.map((p) => (
            <div key={p.id ?? p.name} className="product-card">
              <div className="product-header">
                <h3>{p.name}</h3>
              </div>
              <div className="product-body">
                <div className="product-info">
                  <span className="price-label">Price</span>
                  <span className="price">${Number(p.price).toFixed(2)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
