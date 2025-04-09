import express, { Request, Response } from 'express';
import productRouter from './routes/product.routes';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
dotenv.config()

// Create server
const app = express();

// Middleware
app.use(express.json());

app.use('/products', productRouter)

app.use((req: Request, res: Response) => {
  res.status(404).send('Invalid route!')
})

// Connect to MongoDB and Start Server
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.DATABASE_URI!

mongoose
  .connect(MONGODB_URI, { dbName: 'store' })
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
  })
  .catch((err) => console.error('Failed to connect to MongoDB', err));