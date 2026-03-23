import request from 'supertest';
import { app } from '../../server';
import * as db from '../../data/db';

jest.mock('../../data/db');

describe('API Integration Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /', () => {
    it('should return API running message', async () => {
      const response = await request(app).get('/');

      expect(response.status).toBe(200);
      expect(response.text).toBe('API running');
    });
  });

  describe('GET /health', () => {
    it('should return health check message', async () => {
      const response = await request(app).get('/health');

      expect(response.status).toBe(200);
      expect(response.text).toContain('backend is working');
    });
  });

  describe('GET /products', () => {
    it('should return all products', async () => {
      const mockProducts = [
        { id: 1, name: 'Product A', price: 10.99 },
        { id: 2, name: 'Product B', price: 25.5 },
      ];
      (db.query as jest.Mock).mockResolvedValue({ rows: mockProducts });

      const response = await request(app).get('/products');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockProducts);
      expect(db.query).toHaveBeenCalledWith('SELECT id, name, price FROM products ORDER BY id;');
    });

    it('should return empty array when no products exist', async () => {
      (db.query as jest.Mock).mockResolvedValue({ rows: [] });

      const response = await request(app).get('/products');

      expect(response.status).toBe(200);
      expect(response.body).toEqual([]);
    });

    it('should return 500 when database query fails', async () => {
      (db.query as jest.Mock).mockRejectedValue(new Error('Database error'));

      const response = await request(app).get('/products');

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: 'Failed to fetch products' });
    });
  });

  describe('POST /products', () => {
    it('should create a new product with valid data', async () => {
      const newProduct = { id: 1, name: 'New Product', price: 15.99 };
      (db.query as jest.Mock).mockResolvedValue({ rows: [newProduct] });

      const response = await request(app)
        .post('/products')
        .send({ name: 'New Product', price: 15.99 })
        .set('Content-Type', 'application/json');

      expect(response.status).toBe(201);
      expect(response.body).toEqual(newProduct);
      expect(db.query).toHaveBeenCalledWith(
        'INSERT INTO products (name, price) VALUES ($1, $2) RETURNING id, name, price;',
        ['New Product', 15.99]
      );
    });

    it('should return 400 when name is missing', async () => {
      const response = await request(app)
        .post('/products')
        .send({ price: 15.99 })
        .set('Content-Type', 'application/json');

      expect(response.status).toBe(400);
      expect(response.body).toEqual({ error: 'Name and price are required' });
      expect(db.query).not.toHaveBeenCalled();
    });

    it('should return 400 when price is missing', async () => {
      const response = await request(app)
        .post('/products')
        .send({ name: 'Product' })
        .set('Content-Type', 'application/json');

      expect(response.status).toBe(400);
      expect(response.body).toEqual({ error: 'Name and price are required' });
      expect(db.query).not.toHaveBeenCalled();
    });

    it('should return 400 when body is empty', async () => {
      const response = await request(app)
        .post('/products')
        .send({})
        .set('Content-Type', 'application/json');

      expect(response.status).toBe(400);
      expect(response.body).toEqual({ error: 'Name and price are required' });
    });

    it('should accept price of 0', async () => {
      const newProduct = { id: 1, name: 'Free Product', price: 0 };
      (db.query as jest.Mock).mockResolvedValue({ rows: [newProduct] });

      const response = await request(app)
        .post('/products')
        .send({ name: 'Free Product', price: 0 })
        .set('Content-Type', 'application/json');

      expect(response.status).toBe(201);
      expect(response.body).toEqual(newProduct);
    });

    it('should return 500 when database insert fails', async () => {
      (db.query as jest.Mock).mockRejectedValue(new Error('Insert failed'));

      const response = await request(app)
        .post('/products')
        .send({ name: 'Product', price: 10 })
        .set('Content-Type', 'application/json');

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: 'Failed to create product' });
    });
  });

  describe('404 handling', () => {
    it('should return 404 for unknown routes', async () => {
      const response = await request(app).get('/unknown-route');

      expect(response.status).toBe(404);
    });
  });
});
