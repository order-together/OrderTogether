import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { OrderEntity } from '../entity/order.entity';

// get all orders
export const getOrders = async (req: Request, res: Response) => {
  try {
    const orderRepository = getRepository(OrderEntity);
    const orders = await orderRepository.find({ relations: ["user", "product"] });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders', error });
  }
};

// get single order
export const getOrderById = async (req: Request, res: Response) => {
  try {
    const orderRepository = getRepository(OrderEntity);
    const order = await orderRepository.findOne(req.params.id, { relations: ["user", "product"] });
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching order', error });
  }
};

// create new order
export const createOrder = async (req: Request, res: Response) => {
  try {
    const orderRepository = getRepository(OrderEntity);
    const newOrder = orderRepository.create(req.body);
    await orderRepository.save(newOrder);
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ message: 'Error creating order', error });
  }
};

// update one order
export const updateOrder = async (req: Request, res: Response) => {
  try {
    const orderRepository = getRepository(OrderEntity);
    let order = await orderRepository.findOne(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    orderRepository.merge(order, req.body);
    const updatedOrder = await orderRepository.save(order);
    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: 'Error updating order', error });
  }
};

// delete one order
export const deleteOrder = async (req: Request, res: Response) => {
  try {
    const orderRepository = getRepository(OrderEntity);
    const order = await orderRepository.findOne(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    await orderRepository.remove(order);
    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting order', error });
  }
};
