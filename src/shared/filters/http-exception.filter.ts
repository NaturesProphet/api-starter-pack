import { Catch, HttpException, ExceptionFilter, ArgumentsHost, Logger } from '@nestjs/common';
import { Response, Request } from 'express';


@Catch( HttpException )
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger( 'HTTP Exception Filter' );

  catch ( exception: HttpException, host: ArgumentsHost ): void {
    const contexto = host.switchToHttp();
    const response = contexto.getResponse<Response>();
    const request = contexto.getRequest<Request>();
    const statusCode = exception.getStatus();

    const respostaErro: object = {
      status: statusCode,
      criadoPor: 'HTTPExceptionFilter',
      erro: exception.name || null,
      mensagemDoErro: exception.message || null
    };

    this.logger.error(
      `Method: ${request.method}; Endpoint ${request.url}; Erro: ${exception.message};`,
      JSON.stringify( exception.message ),
    );

    response.status( statusCode ).json( respostaErro );
  }
}
