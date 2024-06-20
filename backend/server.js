import express from 'express';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
dotenv.config(); 

import userRoutes from './routes/userRoutes.js';
import { errorHandler, notFoundHandler } from './middleware/errorMiddleware.js';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser())

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

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