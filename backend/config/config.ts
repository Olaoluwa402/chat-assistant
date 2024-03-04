import * as Joi from 'joi';
import dotenv from 'dotenv';
import path from 'path';

// Specify the path to your .env file here
const envFilePath = path.resolve(__dirname, '../../.env');
dotenv.config({ path: envFilePath });


const envValidation = Joi.object()
    .keys({
        NODE_ENV: Joi.string().valid('production', 'development', 'test').default("development"),
        PORT: Joi.number().default(9000),

        OPENAI_ORG_ID: Joi.string().required(),
        OPENAI_API_KEY: Joi.string().required(),

        LOG_FOLDER: Joi.string().required(),
        LOG_FILE: Joi.string().required(),
        LOG_LEVEL: Joi.string().required(),
    })
    .unknown();

const { value: envVar, error } = envValidation.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}


export const config = {
    env: envVar.NODE_ENV,
    port: envVar.PORT,
    openai: {
        organization_id: envVar.OPENAI_ORG_ID,
        api_key: envVar.OPENAI_API_KEY
    },
    logConfig: {
        logFolder: envVar.LOG_FOLDER,
        logFile: envVar.LOG_FILE,
        logLevel: envVar.LOG_LEVEL
    },
};

export const DefaultRoutePathPrefix = '/v1';

