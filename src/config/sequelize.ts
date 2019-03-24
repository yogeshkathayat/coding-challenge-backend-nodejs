import { Sequelize } from "sequelize-typescript";
import { Op } from "sequelize";
import {
    logs,
    env,
    basePath,
    postgres
} from "./vars";


const dbConfig: any = {
    database: postgres.db,
    dialect: "postgres",
    host: postgres.host,
    port: postgres.port,
    logging: false,
    username: postgres.username,
    password: postgres.password,
    operatorsAliases: Op,
    modelPaths: [__dirname + "../api/models/*.model.*"]
   };

const sequelize = new Sequelize(dbConfig);

export default sequelize;
