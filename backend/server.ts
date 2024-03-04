import express, { Application, Request, Response, urlencoded, json } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import routesConfigs from './routes/route';
import logger from './config/logger';
import { config } from './config/config';
import bodyParser from 'body-parser';
import { NotFoundError } from "./errors/notFoundError"
import errorHandler from "./middleware/errorHandler"



const app: Application = express();

app.use(cors());
app.use(urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(json());
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            imgSrc: ["'self'", 'https://res.cloudinary.com/', 'data:'],
        },
    },
}));

app.get('/', async (req: Request, res: Response) => {
    return res.json({
        status: true,
        message: 'Welcome to Chat Assistant API'
    });
});

routesConfigs.forEach((routeConfig) => new routeConfig(app));

const port = config.port || 9000;
const env = config.env || 'development';

app.listen(port, async () => {
    logger.info(`server running on port ${port}`);
    logger.info(`server running on ${env} environment`);
});

app.use('*', () => {
    throw new NotFoundError();
});

app.use(errorHandler);
