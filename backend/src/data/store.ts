import { query } from './db';
import type { Product } from '../types/product';

export async function getAllProducts(): Promise<Product[]> {
  try {
    const result = await query('SELECT id, name, price FROM products ORDER BY id;');
    return result.rows as Product[];
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
}

export async function createProduct(name: string, price: number): Promise<Product> {
  try {
    const result = await query(
      'INSERT INTO products (name, price) VALUES ($1, $2) RETURNING id, name, price;',
      [name, price]
    );
    return result.rows[0] as Product;
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
}
