import { Sequelize } from "sequelize-typescript";
import {
    logs,
    env,
    basePath,
    postgres
} from "./vars";

const sequelize = new Sequelize({
    database:postgres.db,
    dialect: "postgres",
    host: postgres.host,
    port: postgres.port,
    logging: false,
    username: postgres.username,
    password: postgres.password,
    storage: ":memory:",
});

// sequelize.addModels([ModelName]);

export default sequelize;

