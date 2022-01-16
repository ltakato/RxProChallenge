import dotenv from 'dotenv';

dotenv.config();

const { PORT: port = 3000, NODE_ENV } = process.env

const env: { development: boolean, production: boolean } = {
  development: NODE_ENV === 'development',
  production: NODE_ENV === 'production'
}

export { port, env }
