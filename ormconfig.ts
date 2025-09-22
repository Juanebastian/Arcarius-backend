import { DataSource } from 'typeorm';

export default new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'juan11',
  database: 'arcarius',
  entities: [__dirname + '/src/**/*.entity{.ts,.js}'],
  synchronize: true, // ⚠️ Solo en desarrollo
});
