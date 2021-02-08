import express, { Application } from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
const app: Application = express();

// Import ENV variables
dotenv.config();

// Import routess
import { router as faculty } from './api/faculty';
import { router as courses } from './api/courses';
import { router as user } from './api/user';

// Middlewares
app.use(helmet());
app.use(express.json());

// Route Middlewares
app.use('/api/faculty', faculty);
app.use('/api/courses', courses);
app.use('/api/user', user);

// Handle a production environment
if (process.env.NODE_ENV == 'production') {
	console.log('production mode detected');

	// Static folder
	app.use(express.static(__dirname + '/static/'));

	// Route all 'gets' to  static/index.html for VueJS
	app.get(/.*/, (req, res) => res.sendFile(__dirname + '/static/index.html'));
}

const port: any = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port: ${port}`));
