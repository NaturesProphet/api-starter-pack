import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';



@Injectable()
export class AppLoggerMiddleware implements NestMiddleware {
  private logger = new Logger( 'HTTP' );

  use ( request: Request, response: Response, next: NextFunction ): void {
    let separate = '\n--------------------------------------';
    if ( +process.env.LOG_LEVEL == 5 ) {
      separate = '';
    }

    const { ip, method, baseUrl } = request;
    const userAgent = request.get( 'user-agent' ) || '';

    // não gerar spam do load balancer da amazon fazendo health check periódico.
    if ( baseUrl == '/external/healthcheck' ) {
      next();
    } else {
      request.on( 'close', () => {
        const { statusCode } = response;

        if ( statusCode <= 304 ) {
          this.logger.verbose(
            `${method} ${baseUrl} ${statusCode} - ${userAgent} ${ip}${separate}`
          );
        } else {
          this.logger.error(
            `${method} ${baseUrl} ${statusCode} - ${userAgent} ${ip}${separate}`
          );
        }
        this.logger.debug( `Body: ${JSON.stringify( request.body )}`
          + `\n--------------------------------------` )
      } );
      next();
    }
  }
}
