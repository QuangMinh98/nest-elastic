import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { IConfigService } from 'src/config/domain/ports/IConfigService';

@Global()
@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: (configService: IConfigService) => ({
        uri: configService.get('connectionString'),
      }),
      inject: [IConfigService],
    }),
  ],
  providers: [],
  exports: [MongooseModule],
})
export class DatabaseModule {}
