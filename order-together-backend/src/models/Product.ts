import { db } from '../config/db';

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}

export const getAllProducts = async (): Promise<Product[]> => {
  const [rows] = await db.query('SELECT * FROM products');
  return rows as Product[];
};
