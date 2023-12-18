import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const databaseConfig = {
  connectionString: process.env.DATABASE_URL,
  max: 20,
  idleTimeoutMillis: 200,
  connectionTimeoutMillis: 300,
};

const pool = new Pool(databaseConfig);

//to check database connection

pool.on('connect', (client) => {
  console.log('database connected');
});

pool.on('remove', (client) => {
  console.log('database connection removed');
});

export default pool;
