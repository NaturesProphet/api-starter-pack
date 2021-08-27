import {
  Catch,
  ExceptionFilter,
  ArgumentsHost,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { KnownExceptionMessages } from '../enums/known-exception-messages.enum';



// Ao deixarmos o @Catch vazio indicamos para o framework que é para ele pegar todos os erros não tratados
@Catch()
export class FallbackExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger( 'FallbackExceptionFilter' );

  catch ( err: any, host: ArgumentsHost ): void {
    this.logger.warn( 'Chamando Fallback exception handler' );

    const env = process.env;
    const contexto = host.switchToHttp();
    const response = contexto.getResponse<Response>();
    const request = contexto.getRequest<Request>();


    const mensagem = err.message || err.statusMessage || JSON.stringify( err );
    const method = request.method;
    const endpoint = request.url;
    const stack = err.stack || err.trace || err.stacktrace || err.stackTrace;
    const code = err.code || err.statusCode || err.status;

    console.log( JSON.stringify( err, null, 2 ) )

    const mensagemDoErro =
      env.NODE_ENV === 'prod' ? KnownExceptionMessages.UNKNOWN : `Method: ${method}; Endpoint: ${endpoint}; Mensagem: `
        + `${mensagem}; Stack: ${JSON.stringify( stack )}; Code: ${code};`;

    this.logger.error( `Method: ${method}; Endpoint: ${endpoint}; Erro: ${err?.message?.error}; Mensagem: ${mensagem}; Code: ${code};`, JSON.stringify( err ) );

    response.status( HttpStatus.INTERNAL_SERVER_ERROR ).json( {
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      criadoPor: 'FallbackExceptionFilter',
      erro: err?.message?.error || err?.message?.code || err?.code || 'desconhecido',
      mensagemDoErro,
    } );
  }
}
