import express from 'express';
import dotenv from 'dotenv';
dotenv.config(); 

import userRoutes from './routes/userRoutes.js';
import { errorHandler, notFoundHandler } from './middleware/errorMiddleware.js';
import mongoose from 'mongoose';

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/api/', userRoutes);

app.get('/', (req, res) => res.json('Server is ready'));

app.use(notFoundHandler);
app.use(errorHandler);

// Database Connection
const DB_URL = process.env.DB_URL ||  'mongodb://localhost:27017/react-admin'
mongoose.connect(DB_URL)
.then(() => {
    console.log('Connected to the database');
}).catch((err) => {
    console.error('Database connection error:', err);
});

app.listen(PORT, () => console.log(`Server started on port http://localhost:${PORT}/`));