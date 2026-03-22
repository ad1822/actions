import { describe, it, expect, beforeAll } from 'vitest'
import axios from 'axios'

const BASE_URL = import.meta.env.VITE_BASE_URL

describe('Backend Integration Tests', () => {
  let apiClient: ReturnType<typeof axios.create>

  beforeAll(() => {
    apiClient = axios.create({
      baseURL: BASE_URL,
      timeout: 5000,
      validateStatus: () => true // Don't throw on any status code
    })
  })

  describe('Health Endpoint', () => {
    it('should return 200 status from /health endpoint', async () => {
      const response = await apiClient.get('/health')
      expect(response.status).toBe(200)
    })

    it('should respond quickly to health check', async () => {
      const startTime = Date.now()
      await apiClient.get('/health')
      const duration = Date.now() - startTime
      expect(duration).toBeLessThan(1000) // Should respond within 1 second
    })

    it('should return valid response format from /health', async () => {
      const response = await apiClient.get('/health')
      expect(response.data).toBeDefined()
    })
  })

  describe('Products Endpoint', () => {
    it('should return 200 status from /products endpoint', async () => {
      const response = await apiClient.get('/products')
      expect(response.status).toBe(200)
    })

    it('should return an array of products', async () => {
      const response = await apiClient.get('/products')
      expect(Array.isArray(response.data)).toBe(true)
    })

    it('should return products with valid structure', async () => {
      const response = await apiClient.get('/products')

      if (response.data.length > 0) {
        const product = response.data[0]
        expect(product).toHaveProperty('name')
        expect(product).toHaveProperty('price')
        expect(typeof product.name).toBe('string')
        expect(typeof product.price).toBe('string')
      }
    })

    it('should handle GET request with proper content-type', async () => {
      const response = await apiClient.get('/products')
      expect(response.headers['content-type']).toContain('application/json')
    })

    it('should respond within acceptable time', async () => {
      const startTime = Date.now()
      await apiClient.get('/products')
      const duration = Date.now() - startTime
      expect(duration).toBeLessThan(2000) // Should respond within 2 seconds
    })
  })

  describe('Error Handling', () => {
    it('should handle non-existent endpoints gracefully', async () => {
      const response = await apiClient.get('/non-existent-endpoint')
      expect([404, 500]).toContain(response.status)
    })
  })

  describe('Backend Availability', () => {
    it('should confirm backend is running on port 8080', async () => {
      try {
        const response = await apiClient.get('/health')
        expect(response.status).toBeGreaterThanOrEqual(200)
        expect(response.status).toBeLessThan(600)
      } catch (error) {
        if (axios.isAxiosError(error) && error.code === 'ECONNREFUSED') {
          throw new Error('Backend is not running on localhost:8080. Please start the backend server.')
        }
        throw error
      }
    })
  })
})
