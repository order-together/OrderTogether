import { Request, Response } from 'express';
import gDB from "../initDataSource";
import { OrderEntity } from '../entity/order.entity';
import { UserEntity } from '../entity/user.entity';

const orderRepo = gDB.getRepository(OrderEntity);
const userRepo = gDB.getRepository(UserEntity);

class OrderController {
    static async createOrder(request: Request, response: Response) {
        const { userId, quantity, totalPrice, status } = request.body;

        if (!userId || !quantity || !totalPrice || !status) {
            return response.status(400).send({ message: 'All fields are required.' });
        }

        try {
            const user = await userRepo.findOne({ where: { uid: userId } });

            if (!user) {
                return response.status(404).send({ message: 'User not found.' });
            }

            const newOrder = orderRepo.create({
                user,
                quantity,
                totalPrice,
                status
            });

            await orderRepo.save(newOrder);

            return response.status(201).send({ message: 'Order created successfully.', newOrder });
        } catch (e) {
            return response.status(500).send({ message: 'Error creating order.' });
        }
    }

    static async getAllOrders(request: Request, response: Response) {
        try {
            const orders = await orderRepo.find();
            return response.status(200).send(orders);
        } catch (e) {
            return response.status(500).send({ message: 'Error fetching orders.' });
        }
    }
}

export default OrderController;
