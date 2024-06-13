import { db } from '../config/db';

interface Order {
  id: number;
  productId: number;
  userId: number;
  quantity: number;
}

export const getAllOrders = async (): Promise<Order[]> => {
  const [rows] = await db.query('SELECT * FROM orders');
  return rows as Order[];
};

export const createOrder = async (order: Order): Promise<void> => {
  await db.query('INSERT INTO orders (productId, userId, quantity) VALUES (?, ?, ?)', [order.productId, order.userId, order.quantity]);
};