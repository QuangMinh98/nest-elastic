import { Global, Module } from '@nestjs/common';
import { ConfigModule as Config } from '@nestjs/config';
import { ConfigService } from './config.service';
import { IConfigService } from './domain/ports/IConfigService';

@Global()
@Module({
  imports: [Config.forRoot()],
  providers: [
    {
      provide: IConfigService,
      useClass: ConfigService,
    },
  ],
  exports: [
    {
      provide: IConfigService,
      useClass: ConfigService,
    },
  ],
})
export class ConfigModule {}
