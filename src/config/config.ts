import * as dotenv from 'dotenv';
dotenv.config();
import * as convict from "convict";

const conf = convict({
    env: {
        format: ['development', 'production', 'test'],
        default: 'development',
        env: 'NODE_ENV',
    },
    server: {
        port: {
            format: 'port',
            default: 4300,
            env: 'APP_PORT',
        },
        routingPrefix: {
            format: '*',
            default: "",
            env: 'CONTEXT_PATH',
        },
    },
    database: {
        host: {
            format: '*',
            default: 'localhost',
            env: 'DB_HOST',
        },
        port: {
            format: 'port',
            default: 3306,
            env: 'DB_PORT',
        },
        name: {
            format: '*',
            default: 'sports_vista',
            env: 'DB_NAME',
        },
        username: {
            format: '*',
            default: 'root',
            env: 'DB_USERNAME',
        },
        password: {
            format: '*',
            default: '',
            env: 'DB_PASSWORD',
        }
    }
});

conf.validate({allowed: 'strict'});

export default conf.getProperties();
