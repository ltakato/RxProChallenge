import { createConnection } from "typeorm";

import {Title} from "../entities/Title";
import {User} from "../entities/User";

export const testConn = (drop: boolean = false) => {
  return createConnection({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "Titles2022!",
    database: "titles-test",
    synchronize: drop,
    dropSchema: drop,
    entities: [Title, User]
  });
};
