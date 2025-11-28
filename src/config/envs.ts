/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
  PORT: number;
  STRIPE_ENDPOINT_SECRET: string;
  STRIPE_SECRET: string;
  STRIPE_SUCCESS_URL: string;
  STRIPE_CANCEL_URL: string;
}

const envVarsSchema = joi
  .object<EnvVars>({
    PORT: joi.number().required(),
    STRIPE_ENDPOINT_SECRET: joi.string().required(),
    STRIPE_SECRET: joi.string().required(),
    STRIPE_SUCCESS_URL: joi.string().required(),
    STRIPE_CANCEL_URL: joi.string().required(),
  })
  .unknown(true); // solo valida las variables definidas en el esquema

const { error, value } = envVarsSchema.validate({ ...process.env }) as {
  value: EnvVars;
  error?: joi.ValidationError;
};
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const envVars: EnvVars = value;

export const envs = {
  port: envVars.PORT,
  stripeEndpointSecret: envVars.STRIPE_ENDPOINT_SECRET,
  stripeSecret: envVars.STRIPE_SECRET,
  stripeSuccessUrl: envVars.STRIPE_SUCCESS_URL,
  stripeCancelUrl: envVars.STRIPE_CANCEL_URL,
};
