import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { ProductEntity } from '../entity/product.entity';

// get all products
export const getProducts = async (req: Request, res: Response) => {
  try {
    const productRepository = getRepository(ProductEntity);
    const products = await productRepository.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error });
  }
};

// get single product
export const getProductById = async (req: Request, res: Response) => {
  try {
    const productRepository = getRepository(ProductEntity);
    const product = await productRepository.findOne(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching product', error });
  }
};

// create new product
export const createProduct = async (req: Request, res: Response) => {
  try {
    const productRepository = getRepository(ProductEntity);
    const newProduct = productRepository.create(req.body);
    await productRepository.save(newProduct);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: 'Error creating product', error });
  }
};

// update product information
export const updateProduct = async (req: Request, res: Response) => {
  try {
    const productRepository = getRepository(ProductEntity);
    let product = await productRepository.findOne(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    productRepository.merge(product, req.body);
    const updatedProduct = await productRepository.save(product);
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: 'Error updating product', error });
  }
};

// delete product
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const productRepository = getRepository(ProductEntity);
    const product = await productRepository.findOne(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    await productRepository.remove(product);
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product', error });
  }
};
