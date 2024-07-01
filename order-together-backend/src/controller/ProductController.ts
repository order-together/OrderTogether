import {ProductEntity} from "../entity/product.entity";
import {Request, Response} from "express";
import {uid} from "uid";
import {UserEntity} from "../entity/user.entity";

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
            const products = await ProductEntity.find()
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

            const remainingQuantity = product.targetQuantity - product.currentQuantity;
            const postageShare = parseFloat((product.totalPostage / product.targetQuantity).toFixed(2));
            const jointOrderTotal = (Number(product.unitPrice) + Number(postageShare)).toFixed(2);


            const newProduct = {...product, remainingQuantity,postageShare,jointOrderTotal};


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
    static updateProductCurrentQuantity = async (req: Request, res: Response) => {
        try {
            const product = await ProductEntity.findOne({where: {uid: req.params.uid}})
            if (!product) {
                return res.status(404).send({
                    message: 'Product not found'
                })
            }

            product.currentQuantity = product.currentQuantity + 1

            const updatedProduct = await product.save()

            return res.status(200).send(updatedProduct)
        } catch (e) {
            console.log(e)
            return res.status(500).send({
                message: 'There is something wrong with server, please try again later'
            })
        }
    }


}

export default ProductController