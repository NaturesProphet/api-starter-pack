import { Catch, ExceptionFilter, ArgumentsHost, HttpStatus, Logger } from '@nestjs/common';
import { QueryFailedError } from 'typeorm';
import { Response } from 'express';
import { DBExceptionsCode } from '../enums/db-exception-code.enum';
import { KnownExceptionMessages } from '../enums/known-exception-messages.enum';



@Catch( QueryFailedError )
export class DBExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger( 'DBExcepetionFilters' );

  catch ( exception: any, host: ArgumentsHost ): void {
    this.logger.warn( 'Chamando HTTP exception handler' );
    const contexto = host.switchToHttp();
    const response = contexto.getResponse<Response>();
    let respostaErro: object | any;


    switch ( exception.code ) {
      case DBExceptionsCode.INVALID_FK:
        respostaErro = this.typeormExceptions(
          HttpStatus.BAD_REQUEST,
          KnownExceptionMessages.INVALID_FK,
          exception,
        );
        break;
      case DBExceptionsCode.UNKNOWN_COLUMN:
        respostaErro = this.typeormExceptions(
          HttpStatus.BAD_REQUEST,
          KnownExceptionMessages.UNKNOWN_COLUMN,
          exception,
        );
        break;
      case DBExceptionsCode.UNKNOWN_TABLE:
        respostaErro = this.typeormExceptions(
          HttpStatus.BAD_REQUEST,
          KnownExceptionMessages.UNKNOWN_TABLE,
          exception,
        );
        break;
      default:
        respostaErro = this.typeormExceptions(
          HttpStatus.INTERNAL_SERVER_ERROR,
          KnownExceptionMessages.UNKNOWN_TABLE,
          exception,
        );
        break;
    }
    response.status( respostaErro.status ).json( respostaErro );
  }



  private montarRespostaErro ( statusCode: number, message: string, erro: any ): object {
    return {
      status: statusCode,
      criadoPor: 'DBExcepetionFilter',
      erro,
      mensagemDoErro: message,
    };
  }

  private typeormExceptions ( status: number, message: string, exception: any ): object {
    this.logger.error( message, JSON.stringify( exception ) );
    return this.montarRespostaErro( status, message, exception.code );
  }
}
