import dotenv from 'dotenv';

dotenv.config();

export const __prod__ = process.env.NODE_ENV;

export const PORT = +(process.env.PORT || 4005);

export const HOST = process.env.HOST || '';
