import axios from "axios"
import type { Product } from "./types/product"

const API = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL
})

export const getProducts = async (): Promise<Product[]> => {
  console.log(import.meta.env.VITE_BASE_URL)
  const res = await API.get<Product[]>("/products")
  return res.data
}

export const createProduct = async (product: Product): Promise<Product> => {
  const res = await API.post<Product>("/products", product)
  return res.data
}
