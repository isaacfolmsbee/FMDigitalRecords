import express, { Application } from 'express';
import dotenv from 'dotenv';
const app: Application = express();

// Import ENV variables
dotenv.config();

// Import routess
import { router as faculty } from './api/faculty';

// Middlewares
app.use(express.json());

// Route Middlewares
app.use('/api/faculty', faculty);

const port: any = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port: ${port}`));
