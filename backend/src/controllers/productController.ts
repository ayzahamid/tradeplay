import { Request, Response } from 'express';
import Product from '../models/Product';



export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    return res.json(product);
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }

};

export const registerProduct = async (req: Request, res: Response) => {
  try {
    const { productName, price, description, sellerId } = req.body;
    const newProduct = await Product.create({
      name: productName,
      price,
      description,
      sellerId
    });
    res.status(201).json(newProduct);
  } catch (error) {
    console.error('Error registering product:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const purchaseProduct = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    if (product.status !== 'Available') {
      return res.status(400).json({ message: 'Product is not available for purchase' });
    }

    product.status = 'Sold';
    await product.save();

    return res.json({ message: 'Product purchased successfully' });
  } catch (error) {
    console.error('Error purchasing product:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};


export const makeCounterOffer = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { offer } = req.body;

  try {
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    product.offers.push(offer);

    await product.save();

    return res.status(200).json({ message: 'Counter offer made successfully', product });
  } catch (error) {
    console.error('Error making counter offer:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
