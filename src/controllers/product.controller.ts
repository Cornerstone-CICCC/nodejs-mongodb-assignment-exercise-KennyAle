import { Request, Response } from 'express'
import { Product, IProduct } from '../models/product.model'

// Get all products
const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find()
    res.status(200).json(products)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Unable to fetch all products" })
  }
}

// Get product by id
const getProductById = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const product = await Product.findById(req.params.id)
    if (!product) {
      res.status(404).json({ message: "Product not found" })
      return
    }
    res.status(200).json(product)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Unable to get product" })
  }
}

// Get products by firstname
const getProductsByFirstname = async (req: Request<{}, {}, {}, { firstname: string }>, res: Response) => {
  try {
    const { firstname } = req.query
    const products = await Product.find({
      firstname: {
        $regex: firstname,
        $options: 'i'
      }
    })
    res.status(200).json(products)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Unable to search products" })
  }
}

// Create new product
const createProduct = async (req: Request<{}, {}, IProduct>, res: Response) => {
  try {
    const { productName, productPrice } = req.body
    const product = await Product.create({ productName, productPrice })
    res.status(201).json(product)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Unable to add product' })
  }
}

// Update product by id
const updateProductById = async (req: Request<{ id: string }, {}, Partial<IProduct>>, res: Response) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true // return updated data
    })
    res.status(200).json(product)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Unable to update product" })
  }
}

// Delete product by id
const deleteProductById = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id)
    res.status(200).json(product)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Unable to delete product" })
  }
}

export default {
  getAllProducts,
  getProductById,
  getProductsByFirstname,
  createProduct,
  updateProductById,
  deleteProductById
}