import { Inject, Injectable, Logger } from "@nestjs/common";
import { RedisClient } from "redis";


@Injectable()
export class RedisService {
  private logger: Logger;
  constructor(
    @Inject( 'redis' )
    private readonly client: RedisClient
  ) { this.logger = new Logger( ' REDIS SERVICE ' ) }



  async set ( key: string, value: string ) {
    try {
      await this.setKeyValuePromise( key, value );
    }
    catch ( err ) {
      this.logger.error( `Erro ao fazer SET da chave ${key}`, err );
      throw err;
    }
  }

  async get ( key: string ) {
    try {
      return await this.getValuePromise( key );
    } catch ( err ) {
      this.logger.error( `Erro ao buscar dados da chave ${key}`, err );
      throw err;
    }
  }

  async setTTL ( key: string, seconds: number ) {
    try {
      await this.setTTLKeyPromise( key, seconds );
    } catch ( err ) {
      this.logger.error( `Erro ao configurar TTL da chave ${key}`, err );
      throw err;
    }
  }

  async getTTL ( key: string ) {
    try {
      return await this.getTTLValuePromise( key );
    } catch ( err ) {
      this.logger.error( `Erro ao consultar TTL restante da chave ${key}`, err );
      throw err;
    }
  }






  private setKeyValuePromise ( key: string, value: string ): Promise<boolean> {
    return new Promise( ( resolve, reject ) => {
      this.client.set( key, value, ( err, res ) => {
        if ( res ) {
          resolve( true );
        }
        if ( err ) {
          reject( `Houve um erro ao atualizar o cache. ${err.message}` );
        }
        if ( !res ) {
          reject( `Não houve resposta ao enviar um novo par de key/value ao cache.` )
        }
      } );
    } )
  }

  private getValuePromise ( key: string ): Promise<string> {
    return new Promise( ( resolve, reject ) => {
      this.client.get( key, async ( err, reply ) => {
        if ( reply ) {
          resolve( reply );
        }
        if ( err ) {
          reject( `Erro ao consultar o cache do Redis. ${err.message}` );
        }
        else if ( !reply ) {
          resolve( null );
        }
      } )
    } )
  }

  private setTTLKeyPromise ( key: string, seconds: number ): Promise<boolean> {
    return new Promise( ( resolve, reject ) => {
      this.client.expire( key, seconds, ( err, res ) => {
        if ( res ) {
          resolve( true );
        }
        if ( err ) {
          reject( `Houve um erro ao ajustar um TTL no cache. ${err.message}` );
        }
        if ( !res ) {
          reject( `Não houve resposta ao tentar ajustar um TTL no cache.` )
        }
      } );
    } )
  }

  private getTTLValuePromise ( key: string ): Promise<number> {
    return new Promise( ( resolve, reject ) => {
      this.client.ttl( key, async ( err, reply ) => {
        if ( reply ) {
          resolve( reply );
        }
        if ( err ) {
          reject( `Erro ao consultar o TTL do cache do Redis. ${err.message}` );
        }
        else if ( !reply ) {
          resolve( null );
        }
      } )
    } )
  }

}
