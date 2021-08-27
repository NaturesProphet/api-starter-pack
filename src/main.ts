require( 'dotenv' ).config();
import { RequestMethod, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { port } from './shared/configs/api.conf';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as system from '../package.json';
import logOptions from './shared/configs/log.conf';


async function bootstrap () {
  const app = await NestFactory.create( AppModule, {
    logger: logOptions
  } );
  app.setGlobalPrefix( 'v1', {
    exclude: [ { path: 'api', method: RequestMethod.GET } ],
  } );
  app.useGlobalPipes( new ValidationPipe() );
  app.enableCors( {
    origin: '*',
    methods: [ 'GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS' ],
    preflightContinue: false,
    optionsSuccessStatus: 200
  } );

  const options = new DocumentBuilder();
  options.setTitle( 'Garcia Starter Pack' )
  options.setDescription( system.description )
  options.setVersion( system.version )
  options.addBearerAuth();
  const document = SwaggerModule.createDocument( app, options.build() );
  SwaggerModule.setup( 'api', app, document );

  await app.listen( port );
  console.log( `API Pronta e ouvindo na porta ${port}` );
  console.log( `Log Level: ${logOptions}\n` );
}

bootstrap();
