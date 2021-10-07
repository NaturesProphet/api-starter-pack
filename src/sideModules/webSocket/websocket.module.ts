import { Module } from "@nestjs/common";
import { WebSocketProviders } from "./websocket.providers";
import { WebSocketService } from "./websocket.service";


/**
 * Modulo de websocket utilizando o websocket.io
*/

@Module( {
  imports: [],
  providers: [ WebSocketService, ...WebSocketProviders ],
  exports: [ WebSocketService, ...WebSocketProviders ]
} )
export class WebSocketModule { }
