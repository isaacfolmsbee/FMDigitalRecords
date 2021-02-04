import express, { Application } from 'express';
import dotenv from 'dotenv';
const app: Application = express();

// Middlewares
app.use(express.json());

const port: any = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port: ${port}`));
