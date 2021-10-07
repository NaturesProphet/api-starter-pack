import { Inject, Injectable, Logger } from "@nestjs/common";
import { Server } from 'socket.io';


@Injectable()
export class WebSocketService {
  private logger: Logger;
  constructor(

    @Inject( 'websocket_server' )
    server: Server

  ) {
    this.logger = new Logger( ' WebSocket Service ' )
  }




}