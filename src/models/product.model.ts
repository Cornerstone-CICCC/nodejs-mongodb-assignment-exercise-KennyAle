import mongoose, { Schema, Document } from "mongoose";

export interface IProduct extends Document {
    productName: String,
    productPrice: Number
}

const ProductSchema: Schema = new Schema({
    productName: { type: String, required: true },
    productPrice: { type: Number, required: true },
})

export const Product = mongoose.model<IProduct>('Product', ProductSchema)

