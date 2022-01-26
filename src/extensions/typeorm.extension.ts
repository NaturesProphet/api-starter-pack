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


// opções para bancos com replicaset

// export const typeORMWriterConnection = TypeOrmModule.forRoot( {
//   name: 'default',
//   type: 'mysql',
//   host: process.env.MYSQL_W_HOST_NAME,
//   port: +process.env.MYSQL_W_HOST_PORT,
//   username: process.env.MYSQL_W_USER,
//   password: process.env.MYSQL_W_PASSWORD,
//   database: 'myDB',
//   entities: [ __dirname + '/../**/entities/transactional/*.entity{.ts,.js}' ],
//   keepConnectionAlive: false,
//   synchronize: false,
//   logging: process.env.NODE_ENV === 'test' || 'test:dev' ? false : true,
//   extra: {
//     connectionLimit: 50
//   }
// } );

// export const typeORMReaderConnection = TypeOrmModule.forRoot( {
//   name: 'reader',
//   type: 'mysql',
//   host: process.env.MYSQL_R_HOST_NAME,
//   port: +process.env.MYSQL_R_HOST_PORT,
//   username: process.env.MYSQL_R_USER,
//   password: process.env.MYSQL_R_PASSWORD,
//   database: 'myReplicaDB',
//   entities: [ __dirname + '/../**/entities/views/*.entity{.ts,.js}' ],
//   keepConnectionAlive: false,
//   synchronize: false,
//   logging: process.env.NODE_ENV === 'test' || 'test:dev' ? false : true,
//   extra: {
//     connectionLimit: 50
//   }
// } );