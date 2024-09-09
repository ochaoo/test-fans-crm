import { SequelizeModuleOptions } from '@nestjs/sequelize'

export const databaseConfig: SequelizeModuleOptions = {
    dialect: 'mysql',
    host: process.env.MYSQL_HOST,
    port: Number(process.env.MYSQL_PORT),
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB,
    autoLoadModels: true,
    synchronize: true
}
