import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import fs from 'fs';
import path from 'path';

// initiate express app;
const app = express();

// parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// cors
app.use(
	cors({
		origin: true,
		credentials: true,
	}),
);

// logs
app.use(morgan('dev'));

// x-powered-by
app.disable('x-powered-by');

fs.readdirSync(path.join(__dirname, 'routes')).forEach((file) => {
	if (fs.statSync(path.join(__dirname, 'routes', file)).isDirectory()) {
		import(`./routes/${file}`).then((route) => app.use(`/api/${file}`, route.default));
	}
});

export default app;
