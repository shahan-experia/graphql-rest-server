import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import fileUpload from 'express-fileupload';
import Redis from 'ioredis';
import connectRedis from 'connect-redis';
import session from 'express-session';

import {
	REDIS_HOST,
	REDIS_PASSWORD,
	REDIS_PORT,
	SESSION_NAME,
	SESSION_SECRET,
	SESSION_LIFETIME,
	IN_PROD
} from '../../config';

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

app.use(
	fileUpload({
		limits: { fileSize: 5 * 1024 * 1024 },
	}),
);

// logs
app.use(morgan('dev'));

// x-powered-by
app.disable('x-powered-by');

const RedisStore = connectRedis(session);

const client = new Redis({ host: REDIS_HOST, port: REDIS_PORT, password: REDIS_PASSWORD });
const store = new RedisStore({ client });

app.use(
	session({
		store,
		name: SESSION_NAME,
		secret: SESSION_SECRET,
		resave: false,
		saveUninitialized: false,
		cookie: {
			maxAge: SESSION_LIFETIME,
			sameSite: true,
			secure: IN_PROD
		}
	})
);



fs.readdirSync('./src/express/routes/').forEach((file) => {
	if (fs.statSync(path.join(__dirname, 'routes', file)).isDirectory()) {
		import(`./routes/${file}/routes.js`).then(route => app.use(`/api/${file}`, route.default));
	}
});

export default app;
