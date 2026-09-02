import {DataSource} from "typeorm";
import config from "./config";
import * as path from "path";


const AppDataSource = new DataSource({
    type: "mysql",
    host: config.database.host,
    port: config.database.port,
    username: config.database.username,
    password: config.database.password,
    database: config.database.name,
    entities: [path.join(__dirname + '/../entity/*.*')],
    migrations: [path.join(__dirname + '/../common/migration/*.*')],
    migrationsRun: false,
    synchronize: false,
    connectTimeout: 30000,
    acquireTimeout: 30000
})
export default AppDataSource;