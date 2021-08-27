import { Module } from '@nestjs/common';
import { RedisProviders } from './redis.providers';
import { RedisService } from './redis.service';


@Module( {
  imports: [],
  providers: [ RedisService, ...RedisProviders ],
  exports: [ RedisService, ...RedisProviders ]
} )
export class RedisModule { }
