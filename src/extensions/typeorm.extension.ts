import { TypeOrmModule } from '@nestjs/typeorm';
import { dbHost, dbHostPort, dbUser, dbPassword, dbSchema } from '../shared/configs/db.conf';


export const typeORMConnection = TypeOrmModule.forRoot( {
  type: 'postgres',
  host: dbHost,
  port: dbHostPort,
  username: dbUser,
  password: dbPassword,
  database: dbSchema,
  entities: [ __dirname + '/../**/entities/*.entity{.ts,.js}' ],
  keepConnectionAlive: false,
  synchronize: false,
  logging: process.env.NODE_ENV === 'test' || 'test:dev' ? false : true,
  extra: {
    connectionLimit: 50
  }
} );
