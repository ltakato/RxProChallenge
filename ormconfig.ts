import { ConnectionOptions } from 'typeorm';
import {Title} from "./entities/Title";
import {User} from "./entities/User";

const config: ConnectionOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [Title, User],
  migrations: ["./migrations/*.ts"],
  cli: {
    migrationsDir: './migrations/',
  }
};

export = config;
