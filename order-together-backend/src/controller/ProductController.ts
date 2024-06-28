
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
                where:{uid:creator}
            })

            const newProduct = ProductEntity.create({
                creator:creatorId,
                imgURL,
                productURL,
                name,
                unitPrice,
                targetQuantity,
                totalPostage,
                description,
            })

            newProduct.uid=uid()


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


}

export default ProductController