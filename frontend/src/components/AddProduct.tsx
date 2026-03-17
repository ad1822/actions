import { useState } from "react"
import type { Product } from "../types/product"

interface Props {
  onAdd: (product: Product) => void
}

export default function AddProduct({ onAdd }: Props) {
  const [name, setName] = useState<string>("")
  const [price, setPrice] = useState<number | "">("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!name || !price) return

    onAdd({
      name,
      price: Number(price),
    })

    setName("")
    setPrice("")
  }

  return (
    <form className="add-product-form" onSubmit={handleSubmit}>
      <div className="form-header">
        <h2>➕ Add New Product</h2>
        <p>Quick and easy product addition</p>
      </div>

      <div className="form-group">
        <label htmlFor="name">Product Name</label>
        <input
          id="name"
          type="text"
          placeholder="Enter product name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="price">Price ($)</label>
        <input
          id="price"
          type="number"
          placeholder="Enter price"
          value={price}
          onChange={(e) => setPrice(e.target.value === "" ? "" : Number(e.target.value))}
          step="0.01"
          min="0"
        />
      </div>

      <button type="submit" className="submit-btn">
        Add Product
      </button>
    </form>
  )
}
