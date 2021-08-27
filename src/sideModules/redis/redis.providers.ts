import { Logger } from '@nestjs/common';
import { createClient } from 'redis';
import { redisHost, redisPort, redisPassword, redisPrefix } from '../../shared/configs/redis.conf';


async function createConnection () {
  const x9 = new Logger( ' REDIS ' );
  const client = createClient( {
    host: redisHost,
    port: redisPort,
    password: redisPassword,
    prefix: redisPrefix
  } );

  client.on( 'connect', () => {
    x9.log( 'Client se conectou com sucesso.' );
  } );

  client.on( 'error', ( err ) => {
    x9.error( `Erro na conexão Client com o Redis. `, err );
  } );
  return client;
}



export const RedisProviders = [
  {
    provide: 'redis',
    useFactory: async () => {
      return await createConnection();
    }
  }
];
