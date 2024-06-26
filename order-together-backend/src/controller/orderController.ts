import { Request, Response } from 'express';
import { getAllOrders, createOrder } from '../models/Order';

export const getOrders = async (req: Request, res: Response) => {
  try {
    const orders = await getAllOrders();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders' });
  }
};

export const addOrder = async (req: Request, res: Response) => {
  try {
    const order = req.body;
    await createOrder(order);
    res.status(201).json({ message: 'Order created' });
  } catch (error) {
    res.status(500).json({ message: 'Error creating order' });
  }
};