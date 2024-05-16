import { DataSource } from 'typeorm';

const dataSource = new DataSource({
  type: 'mysql',
  host: process.env.MYSQL_HOST,
  port: parseInt(process.env.MYSQL_PORT as string),
  username: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  migrations: ['migrations/*.ts'],
  entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
  synchronize: false,
});

dataSource.initialize();

export default dataSource;
