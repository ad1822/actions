import * as store from '../data/store';

jest.mock('../data/store');

describe('products route handlers', () => {
  let jsonSpy: jest.Mock;
  let statusSpy: jest.Mock;

  beforeEach(() => {
    jsonSpy = jest.fn().mockReturnValue(undefined);
    statusSpy = jest.fn().mockReturnValue({
      json: jsonSpy,
    });

    jest.clearAllMocks();
  });

  describe('GET /products', () => {
    it('should return all products', async () => {
      const mockProducts = [{ id: 1, name: 'Product 1', price: 10 }];

      (store.getAllProducts as jest.Mock).mockResolvedValue(mockProducts);

      jsonSpy(mockProducts);

      expect(jsonSpy).toHaveBeenCalledWith(mockProducts);
    });

    it('should handle fetch errors', () => {
      statusSpy(500).json({ error: 'Failed to fetch products' });

      expect(statusSpy).toHaveBeenCalledWith(500);
    });
  });

  describe('POST /products', () => {
    it('should validate required fields', () => {
      statusSpy(400).json({ error: 'Name and price are required' });

      expect(statusSpy).toHaveBeenCalledWith(400);
    });

    it('should create product with valid data', async () => {
      const newProduct = { id: 1, name: 'New Product', price: 50 };

      (store.createProduct as jest.Mock).mockResolvedValue(newProduct);

      const created = await store.createProduct('New Product', 50);

      expect(created).toEqual(newProduct);
      expect(store.createProduct).toHaveBeenCalledWith('New Product', 50);
    });
  });
});
