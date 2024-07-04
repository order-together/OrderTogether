import {Request, Response} from 'express';
// import {getAllOrders, createOrder} from '../models/Order';
import {ProductEntity} from "../entity/product.entity";
import { In} from "typeorm";
import User from "../route/user";
import {UserEntity} from "../entity/user.entity";
import {OrderEntity} from "../entity/order.entity";

// export const getOrders = async (req: Request, res: Response) => {
//     try {
//         const orders = await getAllOrders();
//         res.status(200).json(orders);
//     } catch (error) {
//         res.status(500).json({message: 'Error fetching orders'});
//     }
// };
//
// export const addOrder = async (req: Request, res: Response) => {
//     try {
//         const order = req.body;
//         await createOrder(order);
//         res.status(201).json({message: 'Order created'});
//     } catch (error) {
//         res.status(500).json({message: 'Error creating order'});
//     }
// };

export class orderController {
    static getInitiatorOrders = async (req: Request, res: Response) => {
        const {userUid} = req.query;
        try {
            const user = await UserEntity.findOne({where: {uid: userUid as string}});

            if (!user) {
                return res.status(404).send({message: 'User not found'});
            }

            const products = await ProductEntity.find({where: {creator: {id: user.id}}});

            if (!products.length) {
                return res.status(404).send({message: 'No products found for this user'});
            }

            const productUids = products.map(product => product.uid);

            const orders = await OrderEntity.find({
                where: { product: { uid: In(productUids) } },
                relations: ['user', 'product'],
            });

            if (!orders.length) {
                return res.status(404).send({ message: 'No orders found for these products' });
            }

            const groupedOrders = {};
            orders.forEach(order => {
                const productUid = order.product.uid;
                if (!groupedOrders[productUid]) {
                    groupedOrders[productUid] = {
                        productId: productUid,
                        productName: order.product.name,
                        orders: []
                    };
                }
                groupedOrders[productUid].orders.push({
                    orderId: order.id,
                    username: order.user.username,
                    overallRating: order.user.overallRating
                });
            });


            const result = Object.values(groupedOrders);

            return res.status(200).send(result);

        } catch (e) {
            console.log(e)
            return res.status(500).send({
                message: 'There is something wrong with server, please try again later'
            })
        }
    }
}