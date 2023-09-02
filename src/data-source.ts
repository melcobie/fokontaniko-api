import "reflect-metadata"
import { DataSource } from "typeorm"

// export const dbname = "orclpdb";
// export const host = "localhost";

// export const dbconfig = {
//     user: "FOKONTANIKO",
//     password: "123456",
//     connectionString: `${host}/${dbname}`
// };

export const dbname = "xepdb1";
export const host = "62.72.36.236";

export const dbconfig = {
    user: "FOKONTANIKO",
    password: "Sombi123!",
    connectionString: `${host}/${dbname}`,
};

export const AppDataSource = new DataSource({
    type: "oracle",
    host: host,
    port: 1521,
    username: dbconfig.user,
    password: dbconfig.password,
    serviceName: dbname,
    synchronize: false,
    logging: false,
    extra : {
        charset: "AL32UTF8"
    },
    entities: ["src/entity/*.ts"],
    subscribers: [],
    migrations: [],

});

