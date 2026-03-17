import { getAllProducts, createProduct } from '../data/store';
import * as db from '../data/db';

jest.mock('../data/db');

describe('store module', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllProducts', () => {
    it('should fetch all products from database', async () => {
      const mockProducts = [
        { id: 1, name: 'Product 1', price: 10 },
        { id: 2, name: 'Product 2', price: 20 },
      ];

      (db.query as jest.Mock).mockResolvedValue({ rows: mockProducts });

      const products = await getAllProducts();

      expect(products).toEqual(mockProducts);
      expect(db.query).toHaveBeenCalledWith('SELECT id, name, price FROM products ORDER BY id;');
    });

    it('should throw error when database query fails', async () => {
      const dbError = new Error('Database connection failed');
      (db.query as jest.Mock).mockRejectedValue(dbError);

      await expect(getAllProducts()).rejects.toThrow('Database connection failed');
    });
  });

  describe('createProduct', () => {
    it('should create a new product', async () => {
      const newProduct = { id: 3, name: 'New Product', price: 30 };
      (db.query as jest.Mock).mockResolvedValue({ rows: [newProduct] });

      const product = await createProduct('New Product', 30);

      expect(product).toEqual(newProduct);
      expect(db.query).toHaveBeenCalledWith(
        'INSERT INTO products (name, price) VALUES ($1, $2) RETURNING id, name, price;',
        ['New Product', 30]
      );
    });

    it('should throw error when product creation fails', async () => {
      const dbError = new Error('Insert failed');
      (db.query as jest.Mock).mockRejectedValue(dbError);

      await expect(createProduct('Product', 50)).rejects.toThrow('Insert failed');
    });
  });
});
