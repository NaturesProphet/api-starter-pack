import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { typeORMConnection } from './extensions/typeorm.extension';
import { DBExceptionFilter } from './shared/filters/db-exception.filter';
import { FallbackExceptionFilter } from './shared/filters/fallback-exception.filter';
import { HttpExceptionFilter } from './shared/filters/http-exception.filter';
import { AppLoggerMiddleware } from './shared/Logger/middleware';

@Module( {
  imports: [ typeORMConnection ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: FallbackExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: DBExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    }
  ]
} )
export class AppModule implements NestModule {
  configure ( consumer: MiddlewareConsumer ): void {
    consumer.apply( AppLoggerMiddleware ).forRoutes( '*' );
  }
}
