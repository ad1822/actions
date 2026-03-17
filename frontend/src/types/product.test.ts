import { describe, it, expect } from 'vitest'
import type { Product } from './product'

describe('Product type', () => {
  it('should create a product with required fields', () => {
    const product: Product = {
      name: 'Laptop',
      price: 999
    }
    expect(product.name).toBe('Laptop')
    expect(product.price).toBe(999)
  })

  it('should create a product with optional id', () => {
    const product: Product = {
      id: 1,
      name: 'Phone',
      price: 599
    }
    expect(product.id).toBe(1)
    expect(product.name).toBe('Phone')
  })

  it('should accept products with zero price', () => {
    const product: Product = {
      name: 'Free Item',
      price: 0
    }
    expect(product.price).toBe(0)
  })
})
