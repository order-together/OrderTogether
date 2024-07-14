import {ProductEntity} from "../entity/product.entity";
import {Request, Response} from "express";
import {uid} from "uid";
import {UserEntity} from "../entity/user.entity";
import {OrderEntity} from "../entity/order.entity";
import vision from '@google-cloud/vision';
import {getRepository} from "typeorm";



class ProductController {
    static createProduct = async (req: Request, res: Response) => {
        try {
            const {
                creator,
                imgURL,
                productURL,
                name,
                unitPrice,
                targetQuantity,
                ownQuantity,
                totalPostage,
                description
            } = req.body

            const creatorId = await UserEntity.findOne({
                where: {uid: creator}
            })

            const newProduct = ProductEntity.create({
                creator: creatorId,
                imgURL,
                productURL,
                name,
                unitPrice,
                targetQuantity,
                currentQuantity:ownQuantity,
                totalPostage,
                description,
            })

            newProduct.uid = uid()


            await newProduct.save()

            return res.status(200).send({
                newProduct
            })
        } catch (e) {
            console.log(e)
            return res.status(500).send({
                message: 'There is something wrong with server, please try again later'
            })
        }
    }

    // Get all products.
    static getProducts = async (req: Request, res: Response) => {
        try {
            const products = await  ProductEntity
                .createQueryBuilder("product")
                .where("product.targetQuantity - product.currentQuantity > :value", { value: 0 })
                .orderBy("product.createdAt", "DESC")
                .getMany();
            return res.status(200).send(products)
        } catch (e) {
            console.log(e)
            return res.status(500).send({
                message: 'There is something wrong with server, please try again later'
            })
        }
    }

    // Get single product.
    static getProductByUid = async (req: Request, res: Response) => {
        try {
            const product = await ProductEntity.findOne({where: {uid: req.params.uid}})
            if (!product) {
                return res.status(404).send({
                    message: 'Product not found'
                })
            }
            const user = await UserEntity
                .createQueryBuilder("user")
                .leftJoinAndSelect("user.createProducts", "product")
                .where("product.id = :productId", { productId: product.id })
                .getOne();
            const initiator = user.username
            const initiatorUid = user.uid
            const rating = user.overallRating

            const remainingQuantity = product.targetQuantity - product.currentQuantity;
            const postageShare = parseFloat((product.totalPostage / product.targetQuantity).toFixed(2));
            const jointOrderTotal = (Number(product.unitPrice) + Number(postageShare)).toFixed(2);

            const newProduct = {...product, remainingQuantity,postageShare,jointOrderTotal,initiatorUid,initiator,rating};

            return res.status(200).send(newProduct)
        } catch (e) {
            console.log(e)
            return res.status(500).send({
                message: 'There is something wrong with server, please try again later'
            })
        }
    }

    // Update product
    static updateProduct = async (req: Request, res: Response) => {
        try {
            const product = await ProductEntity.findOne({where: {uid: req.params.uid}})
            if (!product) {
                return res.status(404).send({
                    message: 'Product not found'
                })
            }

            ProductEntity.merge(product, req.body)
            const updatedProduct = await product.save()

            return res.status(200).send(updatedProduct)
        } catch (e) {
            console.log(e)
            return res.status(500).send({
                message: 'There is something wrong with server, please try again later'
            })
        }
    }

    // Delete product
    static deleteProduct = async (req: Request, res: Response) => {
        try {
            const product = await ProductEntity.findOne({where: {uid: req.params.uid}})
            if (!product) {
                return res.status(404).send({
                    message: 'Product not found'
                })
            }

            await ProductEntity.remove(product)

            return res.status(200).send({
                message: 'Product deleted successfully'
            })
        } catch (e) {
            console.log(e)
            return res.status(500).send({
                message: 'There is something wrong with server, please try again later'
            })
        }
    }

    //update current quantity
    static makePayment = async (req: Request, res: Response) => {
        try {
            const product = await ProductEntity.findOne({where: {uid: req.params.uid}})
            if (!product) {
                return res.status(404).send({
                    message: 'Product not found'
                })
            }

            const {
                joinQuantity,
                totalPrice,
                userUid
            } = req.body

            product.currentQuantity = product.currentQuantity + Number(joinQuantity)

            if (product.currentQuantity === product.targetQuantity){
                product.status = "Waiting to start"
            }
            else{
                product.status = "Waiting for more participants"
            }

            const updatedProduct = await product.save()

            const userId = await UserEntity.findOne({
                where: {uid: userUid}
            })

            const newOrder = OrderEntity.create({
                user:userId,
                quantity:joinQuantity,
                totalPrice,
                product:product
            })

            newOrder.uid = uid()


            await newOrder.save()


            return res.status(200).send(newOrder)
        } catch (e) {
            console.log(e)
            return res.status(500).send({
                message: 'There is something wrong with server, please try again later'
            })
        }
    }

    static updateProductStatus = async (req: Request, res: Response) => {
        try {
            const product = await ProductEntity.findOne({where: {uid: req.params.uid}})
            if (!product) {
                return res.status(404).send({
                    message: 'Product not found'
                })
            }

            if (product.status === 'Waiting to start'){
                product.status = 'Waiting for participants to complete'
            }

            else if (product.status === 'Waiting for initiator to complete'){
                product.status = 'Complete'
            }

            await product.save();

            return res.status(200).send(product)
        } catch (e) {
            return res.status(500).send({
                message: 'There is something wrong with server, please try again later'
            })
        }
    }

    static safeDetect = async (req: Request, res: Response) => {
        const imageUrl = req.body.imageUrl;

        if (!imageUrl) {
            return res.status(400).send({
                message: 'Image URL is required'
            });
        }

        const client = new vision.ImageAnnotatorClient({
            keyFilename: './src/config/safetyDetect.json',
        });
        // const imageUrl = 'https://www.thesprucepets.com/thmb/Wy9Vno45XeFtos7omJ80qkZrtZc=/3760x0/filters:no_upscale():strip_icc()/GettyImages-174770333-0f52afc06a024c478fafb1280c1f491f.jpg';

        try {
            const [result] = await client.safeSearchDetection(imageUrl);
            const detections = result.safeSearchAnnotation;

            const isSafe = (detections?.adult === 'UNLIKELY' || detections?.adult === 'VERY_UNLIKELY') &&
                (detections?.medical === 'UNLIKELY' || detections?.medical === 'VERY_UNLIKELY') &&
                (detections?.spoof === 'UNLIKELY' || detections?.spoof === 'VERY_UNLIKELY') &&
                (detections?.violence === 'UNLIKELY' || detections?.violence === 'VERY_UNLIKELY') &&
                (detections?.racy === 'UNLIKELY' || detections?.racy === 'VERY_UNLIKELY');

            if (isSafe) {
                return res.status(200).send({
                    message: 'Safe'
                });
            } else {
                return res.status(200).send({
                    message: 'Not Safe',
                    details: detections
                });
            }
        } catch (e) {
            return res.status(500).send({
                message: 'There is something wrong with server, please try again later'
            });
        }
    }



}

export default ProductController