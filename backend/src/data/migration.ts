import { query } from './db';

export async function initializeDatabase(): Promise<void> {
  try {
    // Create products table if it doesn't exist
    await query(`
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Insert seed data if table is empty
    // const result = await query('SELECT COUNT(*) FROM products;');
    // if (parseInt(result.rows[0].count) === 0) {
    //   await query(`
    //     INSERT INTO products (name, price) VALUES
    //     ('Laptop', 1200),
    //     ('Mouse', 25);
    //   `);
    //   console.log('✓ Database initialized with seed data');
    // } else {
    //   console.log('✓ Database already initialized');
    // }
  } catch (error) {
    console.error('Failed to initialize database:', error);
    throw error;
  }
}
