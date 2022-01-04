import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';



@Injectable()
export class AppLoggerMiddleware implements NestMiddleware {
  private logger = new Logger( 'HTTP' );

  use ( request: Request, response: Response, next: NextFunction ): void {
    const separate = '\n--------------------------------------';

    const { ip, method, baseUrl } = request;
    const userAgent = request.get( 'user-agent' ) || '';

    // não gerar spam do load balancer da amazon fazendo health check periódico.
    if ( baseUrl == '/external/healthcheck' ) {
      next();
    } else {
      request.on( 'close', () => {
        const { statusCode } = response;
        let msg: string;

        if ( Object.values( request.body ).length != 0 ) {
          msg = `${method} ${baseUrl} ${statusCode} - ${userAgent}\n\n`;
        }
        else {
          msg = `${method} ${baseUrl} ${statusCode} - ${userAgent}\n${separate}\n`;
        }

        if ( statusCode <= 304 ) {
          this.logger.verbose( msg );
        }
        else {
          this.logger.error( msg );
        }
        if ( Object.values( request.body ).length != 0 ) {
          const body = { ...request.body };

          if ( request.body.password ) {
            body.password = "***";
          }
          if ( request.body.senha ) {
            body.senha = "***";
          }

          else {
            this.logger.debug( `Body: ${JSON.stringify( body )}\n${separate}\n` );
          }
        }
      } );
      next();
    }
  }
}
