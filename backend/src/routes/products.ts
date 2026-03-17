import { Router, Request, Response } from "express"
import { getAllProducts, createProduct } from "../data/store"
import type { Product } from "../types/product"

const router = Router()

router.get("/", async (req: Request, res: Response) => {
  try {
    const products = await getAllProducts()
    res.json(products)
  } catch (error) {
    console.error('Error fetching products:', error)
    res.status(500).json({ error: 'Failed to fetch products' })
  }
})

router.post("/", async (req: Request, res: Response) => {
  try {
    const { name, price } = req.body

    if (!name || price === undefined) {
      res.status(400).json({ error: 'Name and price are required' })
      return
    }

    const newProduct = await createProduct(name, price)
    res.status(201).json(newProduct)
  } catch (error) {
    console.error('Error creating product:', error)
    res.status(500).json({ error: 'Failed to create product' })
  }
})

export default router
