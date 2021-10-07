import { Logger } from '@nestjs/common';
import * as http from 'http';
import { Server, Socket } from 'socket.io';
import { EventosClienteSocket } from './enums/clientEvents.enum';
import { EventosServidorSocket } from './enums/serverEvents.enum';
const porta = 20121;


async function createServer () {
  const logger = new Logger( ' Servidor Websocket ' );
  const server = http.createServer();
  const io = new Server( server, {
    cors: {
      credentials: false,
      origin: '*'
    }
  } );

  io.on( EventosServidorSocket.CONNECTION, async ( client: Socket ) => {
    logger.warn( `Cliente ${client.id} conectado.` );

    // isso é só um teste. remova se for implementar.
    setInterval( () => {
      client.emit( 'evento', { mensagem: 'Funciona!' } )
    }, 1000 );

    client.on( EventosClienteSocket.DISCONNECT, () => {
      logger.warn( `Cliente ${client.id} desconectado` );
    } );

    client.on( EventosClienteSocket.CONNECT_ERROR, () => {
      logger.warn( `Cliente ${client.id} desconectado por time out` );
    } );

    client.on( EventosClienteSocket.ERR, () => {
      logger.warn( `Erro na conexão com o cliente ${client.id} ` );
    } );

    client.on( EventosClienteSocket.RECONNECTING, ( n: number ) => {
      logger.warn( `Cliente ${client.id} tentando se reconectar.. ${n}` );
    } );

    client.on( EventosClienteSocket.RECONNECTION_ERROR, ( e ) => {
      logger.warn( `Erro na reconexão do cliente ${client.id} . ${e}` );
    } );

    client.on( EventosClienteSocket.RECONNECTION_FAILED, () => {
      logger.warn( `Reconexão do cliente ${client.id} falhou` );
    } );

    client.on( EventosClienteSocket.RECONNECTT, () => {
      logger.warn( `Cliente ${client.id} se reconectou som sucesso.` );
    } );

    client.on( EventosClienteSocket.RECONNECT_ATTEMPT, () => {
      logger.warn( `Cliente ${client.id} tentando se rconectar` );
    } );

    client.on( EventosClienteSocket.TIMEOUT, () => {
      logger.warn( `Cliente ${client.id} em time out` );
    } );

    client.on( 'event', data => { /* … */ } );
  } );

  io.on( EventosServidorSocket.DISCONNECT, () => {
    logger.warn( `SERVIDOR SE DESCONECTOU.\n\n` );
  } )

  logger.log( `serviço de websocket iniciado e ouvindo na porta ${porta}` )
  server.listen( porta );
  return io;
}


export const WebSocketProviders = [
  {
    provide: 'websocket_server',
    useFactory: async () => {
      return await createServer();
    }
  }
];
