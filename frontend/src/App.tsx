import { useEffect, useState } from "react"
import { getProducts, createProduct } from "./api"
import type { Product } from "./types/product"
import ProductList from "./components/ProductList"
import AddProduct from "./components/AddProduct"
import "./App.css"

function App() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  const fetchProducts = async () => {
    setLoading(true)
    const data = await getProducts()
    setProducts(data)
    setLoading(false)
  }

  const addProduct = async (product: Product) => {
    await createProduct(product)
    fetchProducts()
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  return (
    <div className="app">
      <header className="header">
        <h1>NEW Product (FROM MAIN)</h1>
      </header>

      <main className="main-content">
        <div className="container">
          <div className="layout">
            <div className="sidebar">
              <AddProduct onAdd={addProduct} />
            </div>

            <div className="content">
              {loading ? (
                <div className="loading">
                  <div className="spinner"></div>
                  <p>Loading products...</p>
                </div>
              ) : (
                <ProductList products={products} />
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
